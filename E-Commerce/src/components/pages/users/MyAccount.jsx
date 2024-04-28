import styles from "./MyAccount.module.css";

import { updateDocument } from "../../utils/firebaseActions";
import Card from "../../UI/Card";
import Input from "../../form/Input";
import Button from "../../UI/Button";
import AlertDialog from "../../dialog/Dialog";

import { useRef, useState } from "react";

const MyAccount = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passRef = useRef();
  const checkboxRef = useRef();
  const [isSaved, setIsSaved] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("data"));
  const userDetails = JSON.parse(user.title);

  const saveChanges = (event) => {
    event.preventDefault();

    userDetails.first_name = firstNameRef.current.value;
    userDetails.last_name = lastNameRef.current.value;
    userDetails.user_name = userNameRef.current.value;
    userDetails.password = passRef.current.value;
    userDetails.see_orders = checkboxRef.current.checked;

    user.title = JSON.stringify(userDetails);
    sessionStorage.setItem("data", JSON.stringify(user));

    updateDocument("users", userDetails.id, userDetails, { merge: true });

    setIsSaved(true);
    // alert("User updated successfully");
  };

  const cancelAlertHandler = () => {
    setIsSaved(false);
  };

  return (
    <div className={styles.outer_container}>
      <Card className={styles.inner_container}>
        <form className={styles.form} onSubmit={saveChanges}>
          <Input
            title="First Name:"
            type="text"
            className={styles.input_container}
            ref={firstNameRef}
            initInput={userDetails.first_name}
          />
          <Input
            title="Last Name:"
            type="text"
            className={styles.input_container}
            ref={lastNameRef}
            initInput={userDetails.last_name}
          />
          <Input
            title="User Name:"
            type="text"
            className={styles.input_container}
            ref={userNameRef}
            initInput={userDetails.user_name}
          />
          <Input
            title="Password:"
            type="text"
            className={styles.input_container}
            ref={passRef}
            initInput={userDetails.password}
          />

          <div className={styles.checkbox_action}>
            <input
              type="checkbox"
              id="checkbox"
              ref={checkboxRef}
              defaultChecked={userDetails.see_orders}
            />
            <span>Allow others to see my orders</span>
          </div>

          <Button title="Save" type="submit" className={styles.btn} />
        </form>
      </Card>

      <AlertDialog
        title="Successfully Updated!"
        message="New user data updated"
        onCancel={cancelAlertHandler}
        buttonTitle='Ok'
        openModal={isSaved}
      />
    </div>
  );
};

export default MyAccount;
