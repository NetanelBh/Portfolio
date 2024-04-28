import styles from "./Button.module.css";

const Button = ({ type, title, onClick, className }) => {
  const classes = `${styles.btn} ${className}`;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {title}
    </button>
  );
};

export default Button;
