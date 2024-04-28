import styles from "./Layout.module.css";

import { Outlet } from "react-router-dom";

import NavBar from "../../UI/NavBar";

const Layout = () => {
  const data = JSON.parse(sessionStorage.getItem("data"));

  return (
    <div className={styles.container}>
      {/* Add the hello header only if the user is admin */}
      {data.admin && data.title && <h1>Hello {data.title}</h1>}
      <NavBar data={data.navHeaders} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
