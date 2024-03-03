import styles from "./editEmployee.module.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Card from "../UI/card";
import Button from "../UI/Button";
import Loading from "../UI/loading";
import ShiftTable from "../shifts/shiftTable";
import { useHttpReq } from "../hooks/useHttpReq";
import EditEmployeeForm from "./editEmployeeForm";
import PagesHeader from "../pagesHeader/pagesHeader";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, fetchedData, sendHttp } = useHttpReq();
  const { data } = location.state;
  const [isRegistereClicked, setIsRegistereClicked] = useState(false);

  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const deleteEmployeeHandler = () => {
    const url = `http://localhost:3001/employees/${data.id}`;
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };

    try {
      sendHttp(url, config);
      navigate("/employees");
    } catch (error) {
      throw new Error(fetchedData.data);
    }
  };

  const submitHandler = (firstName, lastName, startWorkYear, depId) => {
    const updatedEmployee = {
      firstName,
      lastName,
      startWorkYear,
      departmentId: depId,
    };

    const url = `http://localhost:3001/employees/${data.id}`;
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: updatedEmployee,
    };

    try {
      sendHttp(url, config);
      navigate("/employees");
    } catch (error) {
      throw new Error(fetchedData.data);
    }
  };

  let shifts = <p className={styles.no_shift_msg}>No Shifts to Display</p>;
  if (data.shifts.length > 0) {
    shifts = (
      <>
        <Card className={styles.shift_container}>
          <ShiftTable shifts={data.shifts} header={{date: 'Date', hours: 'Hours'}} />
        </Card>
        <br />
      </>
    );
  }

  const registerHandler = () => {
    setIsRegistereClicked(true);

    const url = "http://localhost:3001/employees/schedule";
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };

    try {
      sendHttp(url, config);
    } catch (error) {
      throw new Error(fetchedData.data);
    }
  };

  let availableShifts = null;
  if (fetchedData.data) {
    availableShifts = fetchedData.data.filter((availableShift) => {
      const existEmp = availableShift.employeeId.some((empId) => {
        return empId === data.id;
      });

      if (existEmp) {
        return false;
      }
      return true;
    });
  }

  // AFTER WILL GET THE INFO FROM AVAILABLE SHIFTS, WILL CREATE THIS TABLE
  const availableShiftsData = (
    <>
      <Card className={styles.available_shifts_container}>
        <ShiftTable shifts={data.availableShifts} />
      </Card>
      <br />
    </>
  );

  return (
    <>
      <PagesHeader userName={userName} pageName="Edit Employee" />
      <Card className={styles.emp_container}>
        <p className={styles.emp_name}>
          Employee Name: <span className={styles.name}>{data.name}</span>
        </p>
        <EditEmployeeForm
          onDelete={deleteEmployeeHandler}
          onSubmit={submitHandler}
        />
      </Card>

      <h2 className={styles.shifts_header}>Shifts</h2>
      {shifts}
      <div className={styles.register}>
        {!isRegistereClicked && (
          <Button type="button" onClick={registerHandler}>
            Register
          </Button>
        )}
      </div>
      <br />

      {isLoading && <Loading />}
      {/* {!isLoading && CREATE A TABLE WITH THE AVAILABLE SHIFTS FOR THE USER */}
    </>
  );
};

export default EditEmployee;
