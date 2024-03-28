import styles from './Card.module.css';

const Card = ({className, children}) => {
  const classes = `${styles.card} ${className}`
  return <div className={classes}>{children}</div>
};

export default Card;