import styles from "./header.module.css";

const Header = ({ text, className }) => {
    const classes = `${styles.header} ${className}`
    
    return <header className={classes}>{text}</header>;
};

export default Header;
