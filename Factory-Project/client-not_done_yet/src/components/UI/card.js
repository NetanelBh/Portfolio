import styles from './card.module.css';

const Card = ({className, children}) => {
  const classes = `${styles.main} ${className}`;
  return <div className={classes}>{children}</div>
};

export default Card;