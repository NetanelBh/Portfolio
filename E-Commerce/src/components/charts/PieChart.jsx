import styles from './PieChart.module.css';

import { Chart } from "react-google-charts";

const PieChart = ({ data, options }) => {
  return (
    <div className={styles.pie_container}>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"50rem"}
        height={"30rem"}
      />
    </div>
  );
};

export default PieChart;
