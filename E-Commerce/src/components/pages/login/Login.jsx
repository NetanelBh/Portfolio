import styles from "./Login.module.css";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../UI/Card";
import Input from "../../form/Input";
import Button from "../../UI/Button";

const Login = () => {
  const nameRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [isValidUserName, setIsValidUserName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const allUsers = useSelector((state) => state.users.users);

  // In log in page, clean the session storage from tha last data, need new data
  sessionStorage.clear();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsValidUserName(true);
    setIsValidPassword(true);

    const user = nameRef.current.value;
    const pass = passRef.current.value;

    const existUser = allUsers.find((listUser) => listUser.user_name === user);

    if (!existUser) {
      setIsValidUserName(false);
      return;
    }

    if (existUser.password !== pass) {
      setIsValidPassword(false);
      return;
    }

    if (existUser.admin) {
      const adminNavHeaders = {
        navHeaders: [
          { header: "Categories", navigateTo: "/layout/adminCategory" },
          { header: "Products", navigateTo: "/layout/adminProd" },
          { header: "customers", navigateTo: "/layout/customers" },
          { header: "Statistics", navigateTo: "/layout/statistics" },
          { header: "Logout", navigateTo: "/layout/logout" },
        ],
        title: `${existUser.first_name} ${existUser.last_name}`,
        admin: true
      };
      sessionStorage.setItem("data", JSON.stringify(adminNavHeaders));

      navigate("/layout/adminCategory");
    } else {
      const userNavHeaders = {
        navHeaders: [
          { header: "Products", navigateTo: "/layout/userProd" },
          { header: "My Orders", navigateTo: "/layout/userOrders" },
          { header: "My Account", navigateTo: "/layout/userAccount" },
          { header: "Logout", navigateTo: "/layout/logout" },
        ],
        title: JSON.stringify(existUser),
        admin: false
      };
      sessionStorage.setItem("data", JSON.stringify(userNavHeaders));

      navigate("/layout/userProd");
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.main_container}>
        <Card className={styles.inner_container}>
          <form onSubmit={submitHandler} className={styles.form}>
            <h1>Next Generation E-Commerce</h1>
            <div className={styles.input_container}>
              <Input
                title="User Name:"
                type="text"
                ref={nameRef}
                className={styles.input_direction}
              />
              {!isValidUserName && (
                <p className={styles.invalid}>Invalid User Name</p>
              )}
            </div>

            <div className={styles.input_container}>
              <Input
                title="Password:"
                type="text"
                ref={passRef}
                className={styles.input_direction}
              />
              {!isValidPassword && (
                <p className={styles.invalid}>Invalid Password</p>
              )}
            </div>

            <Button title="Login" type="submit" className={styles.login_btn} />
            <span>
              New user?{" "}
              <Link className={styles.reg_link} to="/register">
                Register
              </Link>
            </span>
          </form>
        </Card>
      </Card>
    </div>
  );
};

export default Login;
