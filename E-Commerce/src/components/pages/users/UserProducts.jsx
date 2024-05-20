import styles from "./UserProducts.module.css";

import { useSelector } from "react-redux";
import { useState } from "react";

import FilterBar from "./FilterBar";
import UserProductItem from "./UserProductItem";
import SideDrawer from "../../cart/SideDrawer";

const UserProducts = () => {
  const [priceBarValue, setPriceBarValue] = useState(0);
  const [filteredSearch, setFilteredSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);

  const priceBarChangeHandler = (value) => {
    setPriceBarValue(value);
  };

  const selectCategoryHandler = (value) => {
    setSelectedCategory(value);
  };

  const searchByTitleHandler = (value) => {
    setFilteredSearch(value);
  };

  const clearHandler = () => {
    setPriceBarValue(0);
    setFilteredSearch("");
    setSelectedCategory("all");
  };

  let filteredProducts = [...products];

  // Filter the products by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === selectedCategory;
    });
  }

  // Filter the products by price
  if (priceBarValue !== 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price <= priceBarValue;
    });
  }

  // Filter the products by user search input
  if (filteredSearch !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.startsWith(filteredSearch);
    });
  }

  return (
    <div className={styles.main_container}>
      {/* Cart slide bar container */}
      <SideDrawer />

      {/* Filters container */}
      <FilterBar
        onPriceChange={priceBarChangeHandler}
        onCategorySelect={selectCategoryHandler}
        onSearch={searchByTitleHandler}
        onClear={clearHandler}
        cartIsOpen={cart.isOpen}
        selectedCategory={selectedCategory}
        filteredSearch={filteredSearch}
        priceBarValue={priceBarValue}
      />

      <div
        className={`${styles.products_container} ${
          cart.isOpen ? styles.products_open_mode : styles.products_close_mode
        }`}
      >
        {filteredProducts.map((product) => {
          return <UserProductItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default UserProducts;
