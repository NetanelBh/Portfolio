import styles from "./Button.module.css";

const Button = ({ type, onClick, className, children }) => {
  const classes = `${styles.style} ${className}`;
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
