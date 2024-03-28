import styles from "./AddForm.module.css";

import { useState } from "react";

import Button from "../UI/Button";
import Input from "../input/Input";

const AddForm = ({ titleName, bodyName, onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const newData = { title, body };

    setTitle("");
    setBody("");
    onAdd(newData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.container}>
        <div className={styles.add_form_container}>
          <Input
            title={titleName}
            type="text"
            name="title"
            value={title}
            onChange={(value) => setTitle(value)}
          />
          <Input
            title={bodyName}
            type="text"
            name="body"
            value={body}
            onChange={(value) => setBody(value)}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            title="Add"
            className={`${styles.action_btn} ${styles.update}`}
          />
          <Button
            type="button"
            title="cancel"
            onClick={() => onCancel()}
            className={`${styles.action_btn} ${styles.delete}`}
          />
        </div>
      </div>
    </form>
  );
};

export default AddForm;
