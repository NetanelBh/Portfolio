import styles from "./departmentTable.module.css";

import DepRowData from "./depRowData";

const DepartmentTable = ({data}) => {
  return (
    <ul className={styles.grid_container}>
      <li className={styles.cell_data}>Department Name</li>
      <li className={styles.cell_data}>Manager</li>
      <li className={styles.cell_data}>Employees</li>
      {data.map((dep, index) => {
        return (
          <DepRowData key={index} data={dep} />
        );
      })}
    </ul>
  );
};

export default DepartmentTable;