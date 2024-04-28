import styles from './Statistics.module.css';

import PieChart from "../../charts/PieChart";
import getPieData from "../../charts/getPieData";
import getPieOptions from "../../charts/getPieOptions";

import BarChart from "../../charts/BarChart";

const Statistics = () => {
  const pieData = getPieData();
  const pieOptions = getPieOptions();

  return (
    <div className={styles.charts_container}>
      <PieChart data={pieData} options={pieOptions} />
      <BarChart />
    </div>
  );
};

export default Statistics;
