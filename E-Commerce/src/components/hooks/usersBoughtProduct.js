import { useSelector } from "react-redux";

const usersBoughtProduct = (productId) => {
  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);

  // Users who allow to see their orders
  const allowSeeOrdersUsers = users.filter((user) => user.see_orders === true);

  let numOfUsers = 0;

  // Check all orders to find the num of users that bought the product
  orders.forEach((order) => {
    // Per each order, check in the users array that allowed to see their orders
    allowSeeOrdersUsers.forEach((user) => {
      // IF the user found, will check if he bought the specific product
      if (user.id === order.userId) {
        const boughtProducts = JSON.parse(order.products);
        // Check all the user's bought products, if the required product exist
        boughtProducts.forEach((p) => {
          if (p.id === productId) {
            numOfUsers += p.qty;
          }
        });
      }
    });
  });

  return numOfUsers;
};

export default usersBoughtProduct;
