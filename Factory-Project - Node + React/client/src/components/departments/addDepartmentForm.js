import styles from "./addDepartmentForm.module.css";

import { useRef } from "react";

import Button from "../UI/Button";

const AddDepartmentForm = ({ onSubmit }) => {
  const depNameRef = useRef();
  const managerIdRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = depNameRef.current.value;
    const manager = managerIdRef.current.value;

    onSubmit({name, manager});
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.input}>
        <label htmlFor="depName">Department Name</label>
        <input id="depName" type="text" ref={depNameRef} />
      </div>

      <div className={styles.input}>
        <label htmlFor="managerName">Manager ID</label>
        <input id="managerName" type="text" ref={managerIdRef} />
      </div>

      <div className={styles.actions}>
        <div className={styles.update_action}>
          <Button type="submit">Add</Button>
        </div>
      </div>
    </form>
  );
};

export default AddDepartmentForm;
