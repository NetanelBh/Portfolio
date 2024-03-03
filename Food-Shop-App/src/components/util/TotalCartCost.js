const TotalCartCost = (items) => {
  return items
    .reduce((totalSum, item) => totalSum + item.quantity * item.price, 0)
    .toFixed(2);
};

export default TotalCartCost;
