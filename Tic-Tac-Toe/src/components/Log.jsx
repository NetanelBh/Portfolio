import styles from "./Log.module.css";

const Log = ({turns}) => {
  return (
    <ol className={styles.log}>
      {turns.map(turn => 
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected [{turn.square.row},{turn.square.col}]
        </li>)}
    </ol>
  );
};

export default Log;
