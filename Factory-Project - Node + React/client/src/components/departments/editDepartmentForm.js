import styles from "./editDepartmentForm.module.css";

import { useRef } from "react";

import Button from "../UI/Button";

const EditDepartmentForm = ({onDelete, onSubmit}) => {
  const depNameRef = useRef();
  const managerIdRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const depName = depNameRef.current.value;
    const managerId = managerIdRef.current.value;

    onSubmit({depName, managerId});
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
          <Button type="submit">Update</Button>
        </div>
        <div className={styles.delete_action}>
          <Button
            type="button"
            onClick={onDelete()}
            className={styles.delete_btn}
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditDepartmentForm;
