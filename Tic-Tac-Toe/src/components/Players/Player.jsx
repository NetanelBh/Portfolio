import { useState } from "react";
import styles from "./Player.module.css";

const PlayerListItem = ({ initName, symbol, isActive, onSavePlayer }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(initName);

  const inputChangeHandler = (event) => {
    setPlayerName(event.target.value);
  };

  let playerInput = <span className="player-name">{playerName}</span>;
  if (isEdit) {
    playerInput = (
      <input
        type="text"
        required
        value={playerName}
        onChange={inputChangeHandler}
        className={`${styles["player-input"]}`}
      />
    );
  }

  const clickHandler = () => {
    setIsEdit((latestPressed) => !latestPressed);

    // If isEdit is shows on screen, it means we clicked on save already
    if (isEdit) {
      onSavePlayer(symbol, playerName);
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className={styles.player}>
        {playerInput}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button id={`${styles["player-button"]}`} onClick={clickHandler}>
        {isEdit ? "Save" : "Edit"}
      </button>
    </li>
  );
};

export default PlayerListItem;
