import styles from "./CategoryListItem.module.css";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { updateDocument, deleteDocument } from "../../utils/firebaseActions";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const CategoryListItem = ({ category }) => {
  const categoryRef = useRef();
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const categoriesList = useSelector((state) => state.categories.categories);

  const updateCategoryHandler = () => {
    // First click, the input is empty, and will not get inside this section
    if (isUpdateClicked) {
      // Check first if the input is empty. If so, don't do anything
      if (categoryRef.current.value.trim().length > 0) {
        const originalCategory = categoriesList.find(
          (c) => c.name === category
        );
        
        const newCategory = {name: categoryRef.current.value};
        updateDocument('categories', originalCategory.id, newCategory);
      }
    }
    // Change the state only at the end to make sure that the input is filled
    setIsUpdateClicked((latestState) => !latestState);
  };

  const removeCategoryHandler = () => {
    const categoryToDelete = categoriesList.find(c => c.name === category);
    deleteDocument('categories', categoryToDelete.id);
  };

  let content = <h2>{category}</h2>;
  if (isUpdateClicked) {
    content = <input id="update" placeholder="New name" ref={categoryRef} />;
  }

  return (
    <Card className={styles.item_container}>
      {content}
      <div className={styles.actions_container}>
        <Button
          title="Update"
          type="button"
          className={`${styles.btn} ${styles.update_btn}`}
          onClick={updateCategoryHandler}
        />
        <Button
          title="Remove"
          type="button"
          className={`${styles.btn} ${styles.remove_btn}`}
          onClick={removeCategoryHandler}
        />
      </div>
    </Card>
  );
};

export default CategoryListItem;
