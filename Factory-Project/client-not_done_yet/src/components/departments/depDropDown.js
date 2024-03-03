import styles from "./depDropDown.module.css";

const DepDropDown = ({ title, onChange }) => {
  const selectDepHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <select className={styles.dropdown} onChange={selectDepHandler}>
      <option value="Choose Department">
        {title}
      </option>
      <option value="R&D">R&D</option>
      <option value="Finance">Finance</option>
      <option value="QA">QA</option>
      <option value="Design">Design</option>
      <option value="Product">Product</option>
      <option value="Maintenance">Maintenance</option>
      <option value="Sales">Sales</option>
      <option value="HR">HR</option>
      <option value="Customer Support">Customer Support</option>
      <option value="Marketing">Marketing</option>
    </select>
  );
};

export default DepDropDown;
