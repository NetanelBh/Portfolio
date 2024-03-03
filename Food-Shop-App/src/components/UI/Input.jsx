import styles from './Input.module.css';

const Input = ({id, label, ...props}) => {
  return <p className={styles.control}>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} required {...props} />
  </p>
};

export default Input;