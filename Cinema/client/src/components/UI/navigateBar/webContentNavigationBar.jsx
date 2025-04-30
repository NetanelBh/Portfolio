import styles from "./webContentNavigationBar.module.css";
import { NavLink } from "react-router-dom";

const WebContentNavigationBar = ({data}) => {
    return (
        <nav className={styles.web_content_nav_container}>
            <ul className={styles.ul}>
                {data.map((navButton) => {
                    return (
                        <li key={navButton.header} className={styles.li}>
                            <NavLink
                                to={navButton.navigateTo}
                                className={({ isActive }) => (isActive ? styles.active : undefined)}
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

export default WebContentNavigationBar;
