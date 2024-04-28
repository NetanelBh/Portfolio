import styles from "./FilterBar.module.css";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "../../UI/Button";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

const FilterBar = ({
  onPriceChange,
  onCategorySelect,
  onSearch,
  onClear,
  cartIsOpen,
  selectedCategory,
  priceBarValue,
  filteredSearch
}) => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div
      className={`${styles.filters_container} ${
        cartIsOpen ? styles.open_mode : styles.close_mode
      }`}
    >
      <p className={styles.filter_header}>Filter by:</p>

      <div className={styles.category_filter_container}>
        <p>Category:</p>
        <select
          id="select"
          value={selectedCategory}
          onChange={(event) => onCategorySelect(event.target.value)}
        >
          <option value="all">All</option>
          {categories.map((category) => {
            return (
              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <p className={styles.price_header}>Price:</p>
      <div className={styles.price_filter_container}>
        <Box sx={{ width: 135 }}>
          <Stack
            direction="row"
            sx={{ mb: 1 }}
            alignItems="center"
            marginTop={1}
          >
            <Slider
              step={1}
              max={1000}
              size="medium"
              aria-label="Price"
              value={priceBarValue}
              onChange={(event) => onPriceChange(event.target.value)}
            />
          </Stack>
        </Box>
        <p className={styles.price_value}>
          {String.fromCharCode(0x20aa)}
          {priceBarValue}
        </p>
      </div>

      <form className={styles.search_container}>
        <label htmlFor="search">Title:</label>
        <input
          value={filteredSearch}
          id="search"
          type="text"
          onChange={(event) => onSearch(event.target.value)}
        />
      </form>

      <Button
        className={styles.clear_btn}
        title="Clear"
        type="button"
        onClick={() => onClear()}
      />
    </div>
  );
};

export default FilterBar;
