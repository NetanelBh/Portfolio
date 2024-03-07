import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./addEmployee.module.css";

import Card from "../UI/card";
import Button from "../UI/Button";
import Loading from "../UI/loading";
import { useHttpReq } from "../hooks/useHttpReq";
import PagesHeader from "../pagesHeader/pagesHeader";

const AddEmployee = () => {
  const depRef = useRef();
  const yearRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const navigate = useNavigate();

  const { isLoading, fetchedData: addData, sendHttp } = useHttpReq();

  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const submitHandler = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3001/employees";

    const employee = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      startWorkYear: yearRef.current.value,
      departmentId: depRef.current.value,
    };

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: employee,
    };

    await sendHttp(url, config);
    if (!addData.success) {
      // throw new Error(addData.data);
    }

    navigate('/employees');
  };

  const cancelHandler = () => {
    navigate("/employees");
  };

  return (
    <>
      <PagesHeader userName={userName} pageName="Add Employee" />
      <Card className={styles.container}>
        <form className={styles.input_container} onSubmit={submitHandler}>
          <div className={styles.input}>
            <label htmlFor="first_name">First Name</label>
            <input id="first_name" type="text" ref={firstNameRef} />
          </div>
          <div className={styles.input}>
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" type="text" ref={lastNameRef} />
          </div>
          <div className={styles.input}>
            <label htmlFor="start_year">Start Work Year</label>
            <input
              id="start_year"
              type="number"
              min={1948}
              max={2024}
              ref={yearRef}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="department">Department ID</label>
            <input id="department" type="text" ref={depRef} />
          </div>

          <div className={styles.actions}>
            <button className={styles.submit_btn} type="submit">
              Save
            </button>
            <Button type="button" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {isLoading && <Loading />}
    </>
  );
};

export default AddEmployee;
