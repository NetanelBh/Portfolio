import styles from "./availableShiftTableRow.module.css";

const ShiftRow = ({shift, className}) => {
  const classes = `${styles.row} ${className}`;

  return (
    <>
      <li className={classes}>{shift.titleA}</li>
      <li className={classes}>{shift.titleB}</li>
    </>
  );
};

export default ShiftRow;
