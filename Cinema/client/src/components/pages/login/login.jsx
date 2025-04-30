import styles from "./login.module.css";
import axios from "axios";

import Card from "../../UI/card/card";
import Button from "../../UI/button/button";
import Input from "../../genericComp/input";
import Header from "../../genericComp/header";

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    localStorage.clear();

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsValidUser(true);
        setIsValidPassword(true);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;        

        const url = "http://localhost:3000/auth/login";
        try {
            const resp = (await axios.post(url, { username, password })).data;
            if (!resp.status && resp.data.includes("username")) {
                setIsValidUser(false);
                return;
            } else if (!resp.status && resp.data.includes("password")) {
                setIsValidPassword(false);
                return;
            } else {         
                // If user authenticated, will save the token in local storage
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("fullName", resp.data.fullName);
                localStorage.setItem("id", resp.data.id);

                // Create the navigations bar headers for the main layout component
                const mainHeadersBar = {
                    headers: [
                        { header: "Movies", navigateTo: "/layout/WebContentLayout/movies/all" },
                        { header: "Subscriptions", navigateTo: "/layout/WebContentLayout/subscriptions/all" },
                    ],
                };

                // To admin there is another tab in navigation bar - manage employees
                if (resp.data.admin) {
                    mainHeadersBar.headers.push({
                        header: "Employees Management",
                        navigateTo: "/layout/WebContentLayout/employees/all",
                    });
                }

                // Store the headers to use them in the generic layout component to create navigations bar
                localStorage.setItem("mainHeaders", JSON.stringify(mainHeadersBar));

                // Create the movies navigations bar headers for the content layout component
                const moviesHeadersBar = {
                    headers: [
                        { header: "All Movies", navigateTo: "/layout/WebContentLayout/movies/all" },
                        { header: "Add Movie", navigateTo: "/layout/WebContentLayout/movies/add" },
                    ],
                };

                // Create the subscriptions navigations bar headers for the content layout component
                const subscriptionsHeadersBar = {
                    headers: [
                        { header: "All Subscriptions", navigateTo: "/layout/WebContentLayout/subscriptions/all" },
                        { header: "Add Subscription", navigateTo: "/layout/WebContentLayout/subscriptions/add" },
                    ],
                };

                // Create the employees navigations bar headers for the content layout component
                const employeesHeadersBar = {
                    headers: [
                        { header: "All Employees", navigateTo: "/layout/WebContentLayout/employees/all" },
                        { header: "Add Employee", navigateTo: "/layout/WebContentLayout/employees/add" },
                    ],
                };

                localStorage.setItem("moviesHeaders", JSON.stringify(moviesHeadersBar));
                localStorage.setItem("subscriptionsHeaders", JSON.stringify(subscriptionsHeadersBar));
                localStorage.setItem("employeesHeaders", JSON.stringify(employeesHeadersBar));

                navigate("/layout/WebContentLayout/movies/all");
            }
        } catch (error) {
            console.log(error.message);
            return;
        }
    };

    return (
        <div className={styles.container}>
            <Header text="Welcome To Netanel Cimema" />
            <Card className={styles.card_container}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.input_container}>
                        <Input title="username" type="text" className={styles.input_direction} ref={usernameRef} />
                        {!isValidUser && <p>Invalid Username</p>}
                    </div>

                    <div className={styles.input_container}>
                        <Input title="password" type="password" className={styles.input_direction} ref={passwordRef} />
                        {!isValidPassword && <p>Invalid password</p>}
                    </div>
                    <Button className={styles.button} text="Login" type="submit" />
                </form>
            </Card>

            <span className={styles.register}>
                New Employee? <NavLink to={"/register"}>Create an account</NavLink>
            </span>
        </div>
    );
};

export default Login;
