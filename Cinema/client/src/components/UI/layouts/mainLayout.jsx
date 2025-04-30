import styles from "./mainLayout.module.css";

import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../genericComp/header";
import NavigationBar from '../navigateBar/navBar';

const MainLayout = () => {
    const navigate = useNavigate();

    const navButtons = JSON.parse(localStorage.getItem("mainHeaders")).headers;
    const employeeName = localStorage.getItem("fullName");

    const logoutHandler = () => {
        // Clear the session storage
        localStorage.clear();

        navigate("/");
    };

    return (
        <>
            <div className={styles.main_layout_bar_container}>
                <NavigationBar data={navButtons} />
                <img src="/logout.png" alt="logout image" className={styles.logout} onClick={logoutHandler}></img>
            </div>

            <div className={styles.main_layout_background}>
                <Header text="Home Cinema" className={styles.main_layout_header} />
                <div className={styles.main_layout_space}/>
                <h2 className={styles.main_layout_employee_name}>{employeeName}</h2>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
