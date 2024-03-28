import styles from "./Input.module.css";

const Input = ({title, type, name, value, onChange, containerStyle}) => {
  let style = `${styles.details}`;
  if(containerStyle) {
    style = containerStyle;
  }
  return (
    <div className={style}>
      <span className={styles.underline}>{title}</span>
      <input
        type={type}
        name={name}
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default Input;
