import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./editDepartment.module.css";

import Card from "../UI/card";
import Loading from "../UI/loading";
import Button from "../UI/Button";
import DropDown from "../dropDown/dropDown";
import PagesHeader from "../pagesHeader/pagesHeader";
import EditDepartmentForm from "./editDepartmentForm";

const EditDepartment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeesNotInDep, setEmployeesNotInDep] = useState([]);
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("user");
  // Get the stored data from depRowData(when linked to this page)
  const departmentData = location.state.data;

  const updateEmployee = async (id, updatedEmployee) => {
    const empUrl = `http://localhost:3001/employees/${id}`;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    const empResp = await axios.patch(empUrl, updatedEmployee, {
      headers: headers,
    });
    if (!empResp.data.success) {
      throw new Error(`Error status: ${empResp.status}`);
    }
  };

  // Update the department in DB and the employee collection to set the new dep
  const updateDepartmentHandler = async (depData) => {
    const depUrl = `http://localhost:3001/departments/${departmentData.depId}`;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    const updatedDep = { name: depData.depName, manager: depData.managerId };
    const updatedEmployee = { departmentId: departmentData.depId };

    setIsLoading(true);
    try {
      const depResp = await axios.patch(depUrl, updatedDep, {
        headers: headers,
      });
      if (!depResp.data.success) {
        throw new Error(`Error status: ${depResp.status}`);
      }

      // Call the fuction to update the employee fields
      updateEmployee(depData.managerId, updatedEmployee);
      // Navigate to departments page
      navigate("/departments");
    } catch (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };

  const getEmployeesNotInDep = useCallback(async () => {
    const url = `http://localhost:3001/departments/${departmentData.depId}`;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    setIsLoading(true);
    try {
      const resp = await axios.get(url, { headers: headers });
      if (!resp.data.success) {
        throw new Error(`Error status: ${resp.data.data}`);
      }

      setEmployeesNotInDep(resp.data.data);
    } catch (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  }, [departmentData.depId, token]);

  useEffect(() => {
    getEmployeesNotInDep();
  }, [getEmployeesNotInDep]);

  const selectEmployeeHandler = (employee) => {
    if (employee === "Choose Employee") {
      setIsEmployeeSelected(false);
      return;
    }

    setSelectedEmployee(employee);
    setIsEmployeeSelected(true);
  };

  const assignEmployeeHandler = () => {
    // Split the full name to first and last name in array
    const separeteName = selectedEmployee.split(" ");
    const firstName = separeteName[0];
    const latName = separeteName[1];

    const filteredEmployee = employeesNotInDep.filter((emp) => {
      return emp.firstName === firstName && emp.lastName === latName;
    });

    // Exctact the employee data from the filtered emp
    const id = filteredEmployee[0]._id;
    const updatedEmp = { departmentId: departmentData.depId };

    updateEmployee(id, updatedEmp);
    // Navigate back to departments page with the employees list update
    navigate("/departments");
  };

  const deleteDepartmentHandler = async () => {
    const url = 'http://localhost:3001/departments';

    const resp = await axios.delete(url);
    if(!resp.data.success) {
      throw new Error(`Error status: ${resp.data.data}`)
    }

    navigate('/departments');
  };

  let namesToDisplay = [];
  if (employeesNotInDep.length > 0) {
    namesToDisplay = employeesNotInDep.map((employee) => {
      return employee.firstName + " " + employee.lastName;
    });
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <PagesHeader userName={userName} pageName="Edit Department" />
          <Card className={styles.dep_container}>
            <p className={styles.dep_name}>
              Department Name:{" "}
              <span className={styles.name}>{departmentData.depName}</span>
            </p>
            <EditDepartmentForm
              onDelete={deleteDepartmentHandler}
              onSubmit={updateDepartmentHandler}
            />
          </Card>
          <div className={styles.actions}>
            <DropDown
              title={"Choose Employee"}
              onChange={selectEmployeeHandler}
              options={namesToDisplay}
            />
            {isEmployeeSelected && (
              <Button
                type="button"
                onClick={assignEmployeeHandler}
                className={styles.button}
              >
                Assign Employee
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EditDepartment;
