import { Link } from "react-router-dom";

import styles from "./employeeRowData.module.css";

const EmployeeRowData = ({ row }) => {
  return (
    <>
      <li className={styles.cell_data}>
        <Link
          className={styles.link_reference}
          to="/employees/edit"
          state={{
            data: { name: row.fullName, shifts: row.shifts, id: row.id },
          }}
        >
          <p className={styles.link}>{row.fullName}</p>
        </Link>
      </li>
      <li className={styles.cell_data}>
        <Link
          className={styles.link_reference}
          to="/departments/edit"
          state={{data: {dep: row.department}}}
        >
          <p className={styles.link}>{row.department}</p>
        </Link>
      </li>
      <li className={styles.cell_data}>
        {row.shifts.map((shift) => {
          return (
            <p key={shift.date}>
              <span className={styles.shift_date}>{shift.date}:</span>{" "}
              {shift.hours}
            </p>
          );
        })}
      </li>
    </>
  );
};

export default EmployeeRowData;
