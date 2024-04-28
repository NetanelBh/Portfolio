import styles from "./BarChart.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "@canvasjs/react-charts";

import getBarData from "./getBarData";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {
  const users = useSelector((state) => state.users.users);
  const [selectedCustomer, setSelectedCustomer] = useState();

  // Get all users except the admin(to avoid displaying him in chart bar)
  const filteredUsers = users.filter((user) => user.admin === false);

  const selectUserHandler = (event) => {
    if (event.target.value === "select") {
      setSelectedCustomer(undefined);
      return;
    }

    const user = filteredUsers.find(
      (user) => `${user.first_name} ${user.last_name}` === event.target.value
    );
    setSelectedCustomer(user.id);
  };

  const data = getBarData(selectedCustomer);

  return (
    <div className={styles.chart_container}>
      <select className={styles.select} onChange={selectUserHandler} id="1">
        <option value="select" id="select">
          Select Customer
        </option>
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.full_name} id={user.id}>
            {`${user.first_name} ${user.last_name}`}
          </option>
        ))}
      </select>
      {selectedCustomer && <CanvasJSChart options={data} />}
    </div>
  );
};

export default BarChart;
