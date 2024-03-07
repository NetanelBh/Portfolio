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
import AvailableShiftsTable from "../shifts/availableShiftsTable";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, fetchedData, sendHttp } = useHttpReq();
  const [empoyeeData, setEmpoyeeData] = useState(location.state.data);
  const [isRegistereClicked, setIsRegistereClicked] = useState(false);
  const [shiftsSchedule, setShiftsSchedule] = useState([]);
  const [shiftsList, setShiftsList] = useState([]);

  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const deleteEmployeeHandler = () => {
    const url = `http://localhost:3001/employees/${empoyeeData.id}`;
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

    const url = `http://localhost:3001/employees/${empoyeeData.id}`;
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
  if (empoyeeData.shifts.length > 0) {
    shifts = (
      <>
        <Card className={styles.shift_container}>
          <ShiftTable
            shifts={empoyeeData.shifts}
            header={{ date: "Date", hours: "Hours" }}
          />
        </Card>
      </>
    );
  }

  // Find the available shifts according to the current user
  const findAvailableShifts = () => {
    let availableShifts = null;

    availableShifts = shiftsSchedule.filter((availableShift) => {
      const existEmp = availableShift.employeeId.some((empId) => {
        return empId === empoyeeData.id;
      });

      if (existEmp) {
        return false;
      }
      return true;
    });

    return availableShifts;
  };

  // Get the shifts data from the database according to the available shifts
  const getShiftsDataArray = (availableShifts) => {
    const arr = shiftsList.filter((shift) => {
      return availableShifts.some((avShift) => shift._id === avShift.shiftId);
    });

    return arr;
  };

  // iterate the array witt map function and extract the shift data as an object
  const extractDataFromShifts = (shiftsList) => {
    const obj = shiftsList.map((shift) => {
      const hours = shift.startingHour + ":00-" + shift.endingHour + ":00";
      return {
        id: shift._id,
        date: shift.date,
        hours,
      };
    });

    return obj;
  };

  const registerHandler = async () => {
    setIsRegistereClicked(true);

    const scheduleUrl = "http://localhost:3001/employees/schedule";
    const shiftsUrl = "http://localhost:3001/shifts";
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    };

    try {
      const scheduleResp = await fetch(scheduleUrl, config);
      const shiftsResp = await fetch(shiftsUrl, config);
      if (!scheduleResp.ok) {
        throw new Error(scheduleResp.status);
      }
      if (!shiftsResp.ok) {
        throw new Error(shiftsResp.status);
      }

      const schedule = await scheduleResp.json();
      const shifts = await shiftsResp.json();
      setShiftsSchedule(schedule.data);
      setShiftsList(shifts.data);
    } catch (error) {
      throw new Error(fetchedData.data);
    }
  };

  const applyEmployeeToAvailableShift = async (shift) => {
    const url = `http://localhost:3001/employees/shift/${shift.id}`;
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({ employeeId: empoyeeData.id }),
    };

    try {
      const resp = await fetch(url, config);
      if (!resp.ok) {
        throw new Error("Update employee's shift failed");
      }
      const prevShift = (await resp.json()).data;
      const shiftScheduleIndex = shiftsSchedule.findIndex((shift) => {
        return shift._id === prevShift._id;
      })

      // Update the specific employee shift array in schedule collection
      const updatedShifts = shiftsSchedule[shiftScheduleIndex];
      updatedShifts.employeeId = [...updatedShifts.employeeId, empoyeeData.id];
      
      // Create new shift to insert to employee shifts array
      const newShift = {
        date: shift.date,
        hours: shift.hours
      };
      setEmpoyeeData(latestState => {
        return {...latestState, shifts: [...latestState.shifts, newShift]}
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  // Find only the available shifts for the current employee
  let availableShifts = (
    <p className={styles.no_shift_msg}>No Available shifts</p>
  );
  if (shiftsSchedule.length > 0) {
    const shifts = findAvailableShifts();
    // Get only the relevant shifts from the shifts collection for the user
    const shiftsDataArray = getShiftsDataArray(shifts);
    // Extract the data from the shifts as an object
    const shiftsAsObj = extractDataFromShifts(shiftsDataArray);

    // WITH 3 COLUMNS: DATE/HOURS/SUBMIT
    availableShifts = (
      <>
        <Card className={styles.available_shifts_container}>
          <AvailableShiftsTable
            shifts={shiftsAsObj}
            onClick={applyEmployeeToAvailableShift}
          />
        </Card>
        <Button type="button" onClick={() => setIsRegistereClicked(false)}>
          Close
        </Button>
        <br />
      </>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <PagesHeader userName={userName} pageName="Edit Employee" />
          <Card className={styles.emp_container}>
            <p className={styles.emp_name}>
              Employee Name: <span className={styles.name}>{empoyeeData.name}</span>
            </p>
            <EditEmployeeForm
              onDelete={deleteEmployeeHandler}
              onSubmit={submitHandler}
            />
          </Card>
          <h2 className={styles.shifts_header}>Employee Shifts</h2>
          {shifts}
          <div className={styles.register}>
            {!isRegistereClicked && (
              <Button
                type="button"
                onClick={registerHandler}
                className={styles.register_btn}
              >
                Register To Available Shift
              </Button>
            )}
            {isRegistereClicked && (
              <>
                <h2 className={styles.shifts_header}>Available Shifts</h2>
                {availableShifts}
              </>
            )}
          </div>
          <br />
        </>
      )}
    </>
  );
};

export default EditEmployee;
