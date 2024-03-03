import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import styles from './FullTable.module.css';

const FullTable = (props) => {
  return (
    <table className={styles.result}>
      <TableHeader tableHeaders={props.tableHeaders} />
      <TableBody userFullData={props.userFullData} />
    </table>
  );
};

export default FullTable;
