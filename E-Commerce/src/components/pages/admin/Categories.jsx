import styles from "./Categories.module.css";

import { useRef } from "react";
import { useSelector } from "react-redux";
import db from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import Card from "../../UI/Card";
import Button from "../../UI/Button";
import CategoryListItem from "./CategoryListItem";

const Categories = () => {
  const inputRef = useRef();
  const categories = useSelector((state) => state.categories.categories);

  const addCategoryHandler = () => {
    const newCategory = {name: inputRef.current.value};
    addDoc(collection(db, 'categories'), newCategory);

    inputRef.current.value = "";
  };

  return (
    <div className={styles.main_container}>
      <h1>Categories</h1>
      <Card className={styles.list_container}>
        <div className={styles.content_container}>
          {categories.map((c) => (
            <CategoryListItem key={c.id} category={c.name} />
          ))}
        </div>

        <div className={styles.actions_wrapper}>
          <div className={styles.item_actions}>
            <input id="category" placeholder="Add category" ref={inputRef} />
            <Button
              title="Add"
              type="button"
              className={styles.btn}
              onClick={addCategoryHandler}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Categories;
