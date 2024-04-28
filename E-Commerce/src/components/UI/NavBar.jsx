import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = ({ data }) => {
  // data is an obj with headers and navigation paths to make it generic
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.ul}>
          {data.map((elem) => {
            return (
              <li key={elem.header}>
                <NavLink
                  to={elem.navigateTo}
                  end
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  {elem.header}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
