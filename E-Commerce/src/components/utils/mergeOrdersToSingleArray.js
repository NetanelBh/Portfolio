const mergeOrdersToSingleArray = (ordersList) => {
  // Merge all orders into single array
  const mergedList = ordersList
    .map((order) => {
      // Parse the orders list(store in DB as JSON.stringify)
      const productsList = JSON.parse(order.products);
      // In the end of the func, flat make it single array from array of arrays
      return productsList.map((product) => {
        return {
          name: product.name,
          qty: product.qty,
          price: product.price,
          date: order.purchased_date,
          userId: order.userId
        };
      });
    })
    .flat();

  return mergedList;
};

export default mergeOrdersToSingleArray;
