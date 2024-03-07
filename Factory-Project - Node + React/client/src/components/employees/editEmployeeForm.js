import styles from "./editEmployeeForm.module.css";

import { useRef } from "react";

import Button from "../UI/Button";

const EditEmployeeForm = ({onDelete, onSubmit}) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const yearRef = useRef();
  const depIdRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const year = yearRef.current.value;
    const depId = depIdRef.current.value;

    onSubmit(name, lastName, year, depId);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.input}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" ref={firstNameRef} />
      </div>
      <div className={styles.input}>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" type="text" ref={lastNameRef} />
      </div>
      <div className={styles.input}>
        <label htmlFor="year">Start Work Year</label>
        <input id="year" type="number" ref={yearRef} />
      </div>
      <div className={styles.input}>
        <label htmlFor="department">Department ID</label>
        <input id="department" type="text" ref={depIdRef} />
      </div>
      <div className={styles.actions}>
        <div className={styles.update_action}>
          <Button type="submit">Update</Button>
        </div>
        <div className={styles.delete_action}>
          <Button
            type="button"
            onClick={onDelete}
            className={styles.delete_btn}
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditEmployeeForm;
