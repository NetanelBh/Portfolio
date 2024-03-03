import styles from './employeesTableHeader.module.css';

const EmployeesTableHeader = ({titles}) => {
  return titles.map((title) => {
    return <li key={title} className={styles.header}>{title}</li>;
  });
};

export default EmployeesTableHeader;