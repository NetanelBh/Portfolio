import styles from "./navBar.module.css";

import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = ({ data }) => {
    // Remove the last part of the path to get the parent path to keep it active when click on child
    let location = useLocation().pathname.split("/");
    location.pop();
    location = location.join("/");

    return (
        <nav>
            <ul className={styles.ul}>
                {data.map((navButton) => {
                    return (
                        <li key={navButton.header} className={styles.li}>
                            <NavLink
                                to={navButton.navigateTo}
                                className={({ isActive }) => {
                                    // Remove the last part of the path to check if child contains the parent path
                                    let path = navButton.navigateTo.split('/');
                                    path.pop();
                                    path = path.join("/");
                                    if (isActive || path === location) {
                                        return styles.active;
                                    }

                                    return undefined;
                                }}
                            >
                                {navButton.header}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavigationBar;
