import styles from "./InvestForm.module.css";
import Card from "../UI/Card";
import { useState } from "react";

const InvestForm = (props) => {
  const [currentSave, setCurrentSave] = useState("");
  const [yearlySave, setYearlySave] = useState("");
  const [expectedRate, setexpectedRate] = useState("");
  const [investDur, setInvestDur] = useState("");

  const enteredCurrentSaveHandler = (event) => {
    setCurrentSave(event.target.value);
  };
  const enteredYearlySaveHandler = (event) => {
    setYearlySave(event.target.value);
  };
  const enteredExpectedRateHandler = (event) => {
    setexpectedRate(event.target.value);
  };
  const enteredInterestDurHandler = (event) => {
    setInvestDur(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // If the user pressed on the submit button without any value, return
    if (currentSave === '' && yearlySave === '' && expectedRate === '' && investDur === '') {
      return;
    }

    const userDetails = {
      'curSave': +currentSave,
      'yearlySave': +yearlySave,
      'expectedRate': +expectedRate / 100,
      'investDur': +investDur
    };

    props.onCalculateUserData(userDetails);

    setCurrentSave("");
    setYearlySave("");
    setexpectedRate("");
    setInvestDur("");
  };

  const resetClickHandler = () => {
    props.onResetClick()
  };


  return (
    <Card className={styles.form}>
      <form onSubmit={submitHandler}>
        <div className={styles["input-group"]}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input type="number" id="current-savings" onChange={enteredCurrentSaveHandler} />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input type="number" id="yearly-contribution" onChange={enteredYearlySaveHandler} />
          </p>
        </div>
        <div className={styles["input-group"]}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expected-return" onChange={enteredExpectedRateHandler} />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" onChange={enteredInterestDurHandler} />
          </p>
        </div>
        <p className={styles.actions}>
          <button type="reset" className={styles.buttonAlt} onClick={resetClickHandler}>
            Reset
          </button>
          <button type="submit" className={styles.button}>
            Calculate
          </button>
        </p>
      </form>
    </Card>
  );
};

export default InvestForm;
