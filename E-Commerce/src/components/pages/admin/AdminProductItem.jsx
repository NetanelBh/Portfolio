import styles from "./AdminProductItem.module.css";

import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../UI/Card";
import Input from "../../form/Input";
import Button from "../../UI/Button";

import { updateDocument } from "../../utils/firebaseActions";
import GenericTable from "../../react-material-table/GenericTable";
import mergeOrdersToSingleArray from "../../utils/mergeOrdersToSingleArray";

const AdminProductItem = ({ product }) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const imageLinkRef = useRef();
  const descriptionRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(product.category);

  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);
  const categories = useSelector((state) => state.categories.categories);

  // Get all categories except the current product category(for dropdown list)
  const filteredCategories = categories.filter((category) => {
    return category.name !== product.category;
  });

  const boughtcolumns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 75,
      },
      {
        accessorKey: "qty",
        header: "Qty",
        size: 75,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 75,
      },
    ],
    []
  );

  // first, merge all orders into one flat array (array of objects)
  const singleOrdersArray = mergeOrdersToSingleArray(orders);

  // Filter the orders array according to product name
  const filtereOrders = singleOrdersArray.filter((order) => {
    return product.title === order.name;
  });

  const tableData = [];
  filtereOrders.forEach((order) => {
    // Each customer that bought this product will add him to table data
    const userName = users.find((user) => user.id === order.userId);
    if (userName) {
      tableData.push({
        name: `${userName.first_name} ${userName.last_name}`,
        qty: order.qty,
        date: order.date,
      });
    }
  });

  const addOrderHandler = (event) => {
    event.preventDefault();

    // The new product name entred by the admin
    const productTitle = titleRef.current.value;

    // Create new object with the relevant properties that changed
    const fieldsToUpdate = {};

    // Check if the product name changed, update all orders with the new name
    if (product.title !== productTitle) {
      // Will add the title property to the final object
      fieldsToUpdate.title = productTitle;

      const editedOrdersList = orders
        .map((order) => {
          const ordersList = JSON.parse(order.products);

          // Flag to determine if the order edited, later will filter the array
          let edited = false;
          // If found the old pruduct's name in some order, change it to the new
          const changedOrders = ordersList.map((o) => {
            if (o.name === product.title) {
              o.name = productTitle;
              edited = true;
            }

            return o;
          });

          return { edited, order: changedOrders, id: order.id };
        })
        .flat();

      // Iterate the orders and update only the changed orders
      editedOrdersList.forEach((order) => {
        if (order.edited) {
          const jsonArray = JSON.stringify(order.order);
          const data = { products: jsonArray };

          // Update in firebase the the relevant orders with the new name
          updateDocument("orders", order.id, data, { merge: true });
        }
      });
    }

    // Check which fields are changed
    if (priceRef.current.value !== product.price) {
      fieldsToUpdate.price = priceRef.current.value;
    }
    if (selectedCategory !== product.category) {
      fieldsToUpdate.category = selectedCategory;
    }
    if (imageLinkRef.current.value !== product.image_link) {
      fieldsToUpdate.image_link = imageLinkRef.current.value;
    }
    if (descriptionRef.current.value !== product.description) {
      fieldsToUpdate.description = descriptionRef.current.value;
    }

    // To update only specific field in document(products), send {merge: true}
    updateDocument("products", product.id, fieldsToUpdate, { merge: true });
  };

  return (
    <form onSubmit={addOrderHandler}>
      <Card className={styles.li}>
        <Input
          title="Title:"
          type="text"
          className={styles.row_input}
          ref={titleRef}
          initInput={product.title}
        />
        <Input
          title="Price:"
          type="text"
          className={styles.column_input}
          ref={priceRef}
          initInput={`${String.fromCharCode(0x20aa)}${product.price}`}
        />

        <div className={styles.category}>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="clothing">{product.category}</option>
            {filteredCategories.map((category) => {
              return (
                <option value={category.name.toLowerCase()} key={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <Input
          title="Link to pic:"
          type="text"
          className={styles.column_input}
          ref={imageLinkRef}
          initInput={product.image_link}
        />

        <div className={styles.description}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            defaultValue={product.description}
            ref={descriptionRef}
          />
        </div>
        <div className={styles.table_container}>
          <GenericTable data={tableData} columns={boughtcolumns} />
        </div>

        <Button title="Save" type="submit" className={styles.save_btn} />
      </Card>
    </form>
  );
};

export default AdminProductItem;
