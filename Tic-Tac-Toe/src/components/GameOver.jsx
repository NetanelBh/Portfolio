import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './GameOver.module.css';

const BackDrop = () => {
  return <div className={styles.backdrop}/>;
};

const Modal = ({winner, onRestart}) => {
  return <div className={styles.gameOver}>
    <h2>Game Over</h2>
    {winner && <p>The winner is <span>{winner}</span></p>}
    {!winner && <p>The game finished with draw</p>}
    <div>
      <button onClick={onRestart}>Restart</button>
    </div>
  </div>
};

const GameOver = ({winner, onRestart}) => {
  return <Fragment>
    {ReactDOM.createPortal(<Modal winner={winner} onRestart={onRestart}/>, document.getElementById('modal'))}
    {ReactDOM.createPortal(<BackDrop />, document.getElementById('backdrop'))}
  </Fragment>
};

export default GameOver;