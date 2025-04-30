import styles from "./register.module.css";

import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../genericComp/header";
import Input from "../../genericComp/input";
import Button from "../../UI/button/button";
import Card from "../../UI/card/card";
import CustomDialog from "../../genericComp/dialog";

const Register = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [validUser, setValidUser] = useState({valid: true, message: ""});

    const registerHandler = async (event) => {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        setValidUser((lastState) => {
            return {...lastState, valid: true, message: ""};
        });
        
        const url = "http://localhost:3000/auth/register";
        try {
            const resp = (await axios.patch(url, { username, password })).data;
            
            if (resp.status) {
                setShowDialog(true);
            } else {
                setValidUser((lastState) => {
                    return {...lastState, valid: false, message: resp.data};
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const closeDialog = () => {
        setShowDialog(false);
        setValidUser((lastState) => {
            return {...lastState, valid: true, message: ""};
        });

        navigate("/");
    };

    return (
        <div className={`${styles.container} ${showDialog ? "blurred" : ""}`}>
            <Header text="Create an Account" />
            {!showDialog && (
                <Card className={styles.card_container}>
                    <form className={styles.form} onSubmit={registerHandler}>
                        <div className={styles.input_container}>
                            <Input title="User Name" type="text" className={styles.input_direction} ref={usernameRef} />
                            {!validUser.valid && <p>{validUser.message}</p>}
                        </div>
                        <div className={styles.input_container}>
                            <Input title="Password" type="text" className={styles.input_direction} ref={passwordRef} />
                        </div>

                        <Button className={styles.button} text="Register" type="submit" />
                    </form>
                </Card>
            )}

            <CustomDialog
                title="Registration Completed!"
                text="Employee Successfully Created!"
                buttonsArray={[
                    { text: "close", onClick: closeDialog },
                ]}
                open={showDialog}
            />
        </div>
    );
};

export default Register;
