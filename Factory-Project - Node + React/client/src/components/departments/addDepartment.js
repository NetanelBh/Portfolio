import styles from "./addDepartment.module.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Card from "../UI/card";
import AddDepartmentForm from "./addDepartmentForm";
import PagesHeader from "../pagesHeader/pagesHeader";

const AddDepartment = () => {
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const addDepartmentHandler = async (department) => {
    const url = "http://localhost:3000/departments";
    const headers = {"Content-Type": "application/json",
    "x-access-token": token,}

    try {
      const resp = await axios.post(url, department, {
        headers,
      });
      if(!resp.data.success) {
        throw new Error(`Error status: ${resp.data.data}`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
    
    navigate("/departments");
  };

  return (
    <>
      <PagesHeader userName={userName} pageName="Add Department" />
      <Card className={styles.dep_container}>
        <AddDepartmentForm onSubmit={addDepartmentHandler} />
      </Card>
    </>
  );
};

export default AddDepartment;
