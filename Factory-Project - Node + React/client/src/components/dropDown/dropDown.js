import styles from "./dropDown.module.css";

const DropDown = ({ title, onChange, options }) => {
  const selectDepHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <select className={styles.dropdown} onChange={selectDepHandler}>
      <option value={title}>{title}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
