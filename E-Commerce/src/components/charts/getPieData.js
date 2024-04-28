import { useSelector } from "react-redux";

const getPieData = () => {
  const orders = useSelector((state) => state.orders.orders);
  const products = useSelector((state) => state.products.products);

  // Object to store one time the orders amounts, prices and products
  const hashMap = {};

  // Update the hashMap with values - sold amount per each product in orders
  orders.forEach((order) => {
    // Convert to object the orders array that stored as string in DB
    const ordersList = JSON.parse(order.products);
    ordersList.forEach((o) => {
      // Find if the key(product name is exist in hashmap)
      const keyExist = Object.keys(hashMap).some((key) => o.name === key);
      if (keyExist) {
        hashMap[o.name] += o.qty * o.price;
      } else {
        hashMap[o.name] = o.qty * o.price;
      }
    });
  });

  const data = [
    ["Product", "Total Cost"],
  ];

  products.forEach(product => {
    if(hashMap[product.title]) {
      data.push([product.title, hashMap[product.title]])
    } else {
      data.push([product.title, 0]);
    }
  });

  return data;
};

export default getPieData;
