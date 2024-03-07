import { Link } from "react-router-dom";

import styles from "./depRowData.module.css";

const DepRowData = ({ data }) => {
  const managerData = data.employees.find(employee => {
    return employee.fullName === data.manager;
  });

  return (
    <>
      <li className={styles.cell_data}>
        <Link
          className={styles.link_reference}
          to="/departments/edit"
          state={{
            data: { depName: data.name, depId: data.depId},
          }}
        >
          <p className={styles.link}>{data.name}</p>
        </Link>
      </li>

      <li className={styles.cell_data}>
        <Link
          className={styles.link_reference}
          to="/employees/edit"
          state={{
            data: {
              name: managerData.fullName,
              shifts: managerData.shifts,
              id: managerData.id,
            },
          }}
        >
          <p className={styles.link}>{data.manager}</p>
        </Link>
      </li>

      <li className={styles.cell_data}>
        {data.employees.map((employee, index) => {
          return (
            <Link
              key={index}
              className={styles.link_reference}
              to="/employees/edit"
              state={{
                data: {
                  name: employee.fullName,
                  shifts: employee.shifts,
                  id: employee.id,
                },
              }}
            >
              <p className={styles.link}>{employee.fullName}</p>
            </Link>
          );
        })}
      </li>
    </>
  );
};

export default DepRowData;
