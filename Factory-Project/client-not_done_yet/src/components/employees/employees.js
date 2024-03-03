import styles from "./employees.module.css";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Button from "../UI/Button";
import EmployeesTable from "./employeesTable";
import PagesHeader from "../pagesHeader/pagesHeader";
import DepDropDown from "../departments/depDropDown";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const sendRequest = useCallback(async (url, config) => {
    try {
      const resp = await fetch(url, config);
      if (!resp.ok) {
        throw new Error("Can't fetch employees list");
      }

      const employees = await resp.json();
      setEmployees(employees.data);
      setFilteredList(employees.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    sendRequest("http://localhost:3001/employees", {
      method: "GET",
      body: null,
      headers: { "Content-Type": "application/json", "x-access-token": token },
      mode: "cors",
    });
  }, [sendRequest, token]);

  const addEmployeeHandler = () => {
    navigate("/employees/add");
  };

  const selectedDepHandler = (selectedDep) => {
    if (selectedDep === "Choose Department") {
      setFilteredList(employees);
      return;
    }

    const filteredEmp = employees.filter((employee) => {
      return employee.department === selectedDep;
    });

    setFilteredList(filteredEmp);
  };

  const headers = ["fullName", "department", "shifts"];

  return (
    <div className={styles.main}>
      <PagesHeader userName={userName} pageName={"Employees List"} />
      <div className={styles.actions}>
        <DepDropDown title="Choose Department" onChange={selectedDepHandler} />
        <Button type="button" onClick={addEmployeeHandler}>
          New Employee
        </Button>
      </div>
      <EmployeesTable header={headers} rows={filteredList} /> <br />
    </div>
  );
};

export default Employees;
