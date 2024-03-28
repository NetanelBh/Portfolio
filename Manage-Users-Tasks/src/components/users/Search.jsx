import styles from "./Search.module.css";

import Button from "../UI/Button";

const Search = ({ onSearch, onAddUser }) => {
  const searchHandler = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <label className={styles.label} htmlFor="search">
          Search
        </label>
        <input
          className={styles.input}
          id="search"
          type="search"
          onChange={searchHandler}
        />
      </div>
      <div>
        <Button
          type="button"
          title="Add"
          onClick={() => onAddUser()}
          className={styles.btn}
        />
      </div>
    </div>
  );
};

export default Search;
