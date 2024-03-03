import styles from "./employeesTable.module.css";

import EmployeeRowData from "./employeeRowData";
import EmployeesTableHeader from "./employeesTableHeader";

const EmployeesTable = ({ header, rows }) => {
  return (
    <ul className={styles.grid_container}>
      <EmployeesTableHeader titles={header} />
      {rows.map((row) => {
        return (
          <EmployeeRowData key={row.fullName} row={row} />
        );
      })}
    </ul>
  );
};

export default EmployeesTable;
