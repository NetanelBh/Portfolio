import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src="/game-logo.png" />
      <h1>Tic-Tac-Toe</h1>
    </div>
  );
};

export default Header;
