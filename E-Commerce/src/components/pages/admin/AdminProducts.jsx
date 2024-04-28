import styles from "./AdminProducts.module.css";

import { useSelector } from "react-redux";

import Button from "../../UI/Button";
import AdminProductItem from "./AdminProductItem";
import { addDocument } from "../../utils/firebaseActions";

const AdminProducts = () => {
  const products = useSelector((state) => state.products.products);

  const addProductHandler = () => {
    // Add New Product, add an empty product section to DB for fill.
    const emptyObj = {
      title: "",
      price: "",
      category: "",
      description: "",
      image_link: "",
    };

    addDocument("products", emptyObj);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_container}>
        <h1>Products</h1>
        <Button
          type="button"
          title="Add New Product"
          className={styles.add_button}
          onClick={addProductHandler}
        />
      </div>
      {products.map((product) => (
        <AdminProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProducts;
