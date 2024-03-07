import styles from './availableShiftTableRow.module.css';

import Button from '../UI/Button';

const AvailableShiftTableRow = ({shift, onClick}) => {
  return <>
    <li className={styles.row}>{shift.date}</li>
    <li className={styles.row}>{shift.hours}</li>
    <Button type='button' onClick={() => onClick(shift)} className={styles.apply_btn}>Submit</Button>
  </>
};

export default AvailableShiftTableRow;