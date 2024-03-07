import styles from "./shiftTable.module.css";

import ShiftRow from "./shiftRow";

const ShiftTable = ({ shifts, header }) => {
  return (
    <ul className={styles.grid}>
      <ShiftRow shift={{titleA: header.date, titleB: header.hours}} className={styles.header}/>
      {shifts.map((shift, index) => {
        return <ShiftRow key={index} shift={{titleA: shift.date, titleB: shift.hours}} />;
      })}
    </ul>
  );
};

export default ShiftTable;
