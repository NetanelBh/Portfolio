import styles from './pagesHeader.module.css';
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button";
import LogoutProcess from "../utils/logoutProcess";

const PagesHeader = ({userName, pageName}) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const moveTo = LogoutProcess();

    navigate(moveTo);
  };


  return (
    <div className={styles.header}>
      <h2>{userName}</h2>
      <h2>{pageName}</h2>
      <Button type='button' onClick={logoutHandler} className={styles.btn}>Logout</Button>
    </div>
  );
};

export default PagesHeader;
