import { useSelector } from "react-redux";

const getBarData = (customerId) => {
  const orders = useSelector((state) => state.orders.orders);

  const filteredOrders = orders.filter((order) => order.userId === customerId);
  
  const productsObj = {};
  filteredOrders.forEach(order => {
    JSON.parse(order.products).forEach((product) => {
      if(!productsObj[product.name]) {
        productsObj[product.name] = product.qty;
      } else {
        productsObj[product.name] += product.qty
      }
    });
  });
  
  // map the object keys to create array of objects for the table data array
  const tableData = Object.keys(productsObj).map(key => {
    return {label: key, y: productsObj[key]};
  });

  const details = {
    title: {
      text: "Products Quantity Per Customer",
      fontStyle: "italic",
      margin: 50,
      fontSize: 30,
    },
    axisY: {
      margin: 30,
      minimum: 0,
      interval: 2
    },
    axisX: {
      margin: 10,
    },
    backgroundColor: "#DAF5FF",
    theme: "light2", // "light1", "dark1", "dark2"
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: tableData
      },
    ],
  };

  return details;
};

export default getBarData;
