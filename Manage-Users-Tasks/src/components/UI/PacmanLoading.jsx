import styles from "./PacmanLoading.module.css";

import PacmanLoader from "react-spinners/PacmanLoader";

const PacmanLoading = ({color}) => {
  return (
    <div className={`${styles["spin-loader"]}`}>
      <PacmanLoader
        color={color}
        margin={2}
        size={25}
        speedMultiplier={1}
      />
    </div>
  );
};

export default PacmanLoading;
