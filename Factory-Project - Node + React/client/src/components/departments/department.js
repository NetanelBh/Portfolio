import styles from "./department.module.css";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Button from "../UI/Button";
import Loading from "../UI/loading";
import DepartmentTable from "./departmentTable";
import PagesHeader from "../pagesHeader/pagesHeader";

const DEP_URL = "http://localhost:3001/departments";
const EMP_URL = "http://localhost:3001/employees";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const sendHttp = useCallback(async (url, identifier) => {
    setIsLoading(true);
    try {
      const resp = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      if (identifier === "dep") {
        setDepartments(resp.data);
      } else setEmployees(resp.data);
    } catch (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    sendHttp(DEP_URL, "dep");
    sendHttp(EMP_URL, "emp");
  }, [sendHttp]);

  const addDepartmentHandler = () => {
    navigate('/departments/add');
  };

  let depTableData = [];
  if (employees.data && departments.data) {
    // Extract the dep name and the manager name
    departments.data.forEach((department) => {
      const dep = employees.data.find((employee) => {
        return department.manager === employee.id;
      });

      // Extract the department's employees
      const employeesList = employees.data.filter((employee) => {
        return department.name === employee.department;
      });

      depTableData.push({
        name: dep.department,
        depId: department._id,
        manager: dep.fullName,
        employees: employeesList,
      });
    });
  }

  return (
    <>
      {!isLoading && depTableData.length > 0 && (
        <div className={styles.main}>
          <PagesHeader userName={userName} pageName="Department" />
          <div className={styles.actions}>
            <Button type="button" onClick={addDepartmentHandler}>
              New Department
            </Button>
          </div>
          <DepartmentTable data={depTableData} />
          <br />
        </div>
      )}
      {!isLoading && depTableData.length === 0 && (
        <h1>There is no departments in DB</h1>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Department;
