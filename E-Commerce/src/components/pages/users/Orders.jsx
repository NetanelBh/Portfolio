import styles from "./Orders.module.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import GenericTable from "../../react-material-table/GenericTable";
import mergeOrdersToSingleArray from "../../utils/mergeOrdersToSingleArray";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const user = JSON.parse(JSON.parse(sessionStorage.getItem("data")).title);

  const headers = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 75,
      },
      {
        accessorKey: "qty",
        header: "Qty",
        size: 30,
      },
      {
        accessorKey: "total",
        header: "Total",
        size: 30,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 75,
      },
    ],
    []
  );

  const filteredOrders = orders.filter((order) => order.userId === user.id);
  const mergedOrders = mergeOrdersToSingleArray(filteredOrders);

  const content = mergedOrders.map((order) => {
    const totalPrice = order.qty * order.price;

    return {
      name: order.name,
      qty: order.qty,
      total: `${String.fromCharCode(0x20aa)}${totalPrice}`,
      date: order.date,
    };
  });

  return (
    <div className={styles.main_container}>
      <h1>Orders</h1>
      <div className={styles.table_container}>
        <GenericTable data={content} columns={headers} />
      </div>
    </div>
  );
};

export default Orders;
