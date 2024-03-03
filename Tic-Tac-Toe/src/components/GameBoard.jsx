import styles from "./GameBoard.module.css";

const GameBoard = ({board, onSelectSquare}) => {
  return (
    <ol className={styles.gameBoard}>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button 
                onClick={() => onSelectSquare(rowIndex, colIndex)}
                disabled={playerSymbol !== null}>
                  {playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
