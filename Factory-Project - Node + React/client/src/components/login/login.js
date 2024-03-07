import { useRef } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

import Card from "../UI/card";
import Loading from "../UI/loading";
import Button from "../UI/Button";
import { useHttpReq } from "../hooks/useHttpReq";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, fetchedData: loginData, sendHttp } = useHttpReq();
  const userRef = useRef();
  const emailRef = useRef();

  const loginHandler = (url, config) => {
    sendHttp(url, config);

    // If the user authenticated, will store the user name and the token
    if (loginData.success) {
      // Save the token in session storage to send it to server each request
      sessionStorage.setItem("token", loginData.data);
      sessionStorage.setItem("user", config.body.user);
      navigate("/employees");
    } else {
      // throw new Error("Can't login");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const url = "http://localhost:3001/auth/login";
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { user: userRef.current.value, email: emailRef.current.value },
    };

    loginHandler(url, config);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Card className={styles.login_main}>
          <form>
            <div className={styles.header}>
              <h1>Login To System</h1>
            </div>
            <div className={styles.username}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                defaultValue="Samantha"
              ></input>
            </div>
            <div className={styles.email}>
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                defaultValue="Nathan@yesenia.net"
              ></input>
            </div>

            <div className={styles.actions}>
              <Button type="submit" onClick={submitHandler} title="Login">
                Login
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default Login;
