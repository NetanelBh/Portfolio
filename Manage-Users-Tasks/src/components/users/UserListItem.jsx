import styles from "./UserListItem.module.css";

import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../input/Input";

const UserListItem = ({ user, onUpdate, onDelete, onSelectUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const nameChangeHandler = (value) => setName(value);

  const emailChangeHandler = (value) => setEmail(value);

  const updateHandler = () => {
    const data = { name, email, id: user.id };
    onUpdate(data);
  };

  return (
    <li>
      <div className={styles.container}>
        <div>
          <p>
            <span
              onClick={() => onSelectUser(user.id)}
              className={`${styles.underline} ${styles.id}`}
            >
              ID:
            </span>
            {user.id}
          </p>
        </div>

        <Input
          title="Name:"
          type="text"
          name="fullName"
          value={name}
          onChange={nameChangeHandler}
        />
        <Input
          title="Email:"
          type="text"
          name="mail"
          value={email}
          onChange={emailChangeHandler}
        />

        {/* SHOW OTHER DATA ONLY IF IT'S ORIGINAL USER AND NOT ADDED USER */}
        {user.address && (
          <>
            <section className={styles.other_data}>Other Data</section>
            <div className={styles.additional_section}>
              <Card className={styles.additional_data}>
                <div
                  className={`${styles.details} ${styles.additional_container}`}
                >
                  <span className={styles.underline}>Street:</span>
                  <input
                    name="street"
                    className={`${styles.street_input} ${styles.additional_input}`}
                    value={user.address.street}
                    readOnly
                  />
                </div>
                <div
                  className={`${styles.details} ${styles.additional_container}`}
                >
                  <span className={styles.underline}>City:</span>
                  <input
                    name="city"
                    className={`${styles.city_input} ${styles.additional_input}`}
                    value={user.address.city}
                    readOnly
                  />
                </div>
                <div
                  className={`${styles.details} ${styles.additional_container}`}
                >
                  <span className={styles.underline}>Zip Code:</span>
                  <input
                    type="text"
                    name="postal"
                    className={`${styles.postal_input} ${styles.additional_input}`}
                    value={user.address.zipcode}
                    readOnly
                  />
                </div>
              </Card>
            </div>
          </>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            title="Update"
            onClick={updateHandler}
            className={`${styles.btn} ${styles.update}`}
          />
          <Button
            type="button"
            title="Delete"
            onClick={() => onDelete(user.id)}
            className={`${styles.btn} ${styles.delete}`}
          />
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
