import styles from "./input.module.css";

import { forwardRef } from "react";

const Input = forwardRef(({ title, type, className, value="" }, ref) => {
    const classes = `${styles.container} ${className}`
    return (
        <div className={classes}>
            <label htmlFor={title}>{title}:</label>
            <input type={type} id={title} ref={ref} autoComplete="off" defaultValue={value} />
        </div>
    );
});

export default Input;
