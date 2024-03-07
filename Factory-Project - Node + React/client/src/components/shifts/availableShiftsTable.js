import styles from "./availableShiftsTable.module.css";

import AvailableShiftTableRow from './availableShiftTableRow';

const AvailableShiftsTable = ({ shifts, onClick }) => {
  return (
    <ul className={styles.grid}>
      <li className={styles.header}>Date</li>
      <li className={styles.header}>Hours</li>
      <li className={styles.header}>Apply</li>
    
      {shifts.map((shift, i) => {
        return <AvailableShiftTableRow shift={shift} onClick={(shift) => onClick(shift)} key={i} />
      })}
    </ul>
  );
};

export default AvailableShiftsTable;
