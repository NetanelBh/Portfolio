import { useState } from "react";

import Header from "./components/Header/header";
import Player from "./components/Players/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import WINNING_COMBINATIONS from "./components/WinningCombinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentTurnSymbol = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentTurnSymbol = "O";
  }

  return currentTurnSymbol;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  }

  return winner;
};

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  const selectSquareHandler = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurn) => {
      const currentTurnSymbol = deriveActivePlayer(prevGameTurn);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentTurnSymbol }, ...prevGameTurn];

      return updatedTurns;
    });
  };

  const playerNameHandler = (symbol, newName) => {
    setPlayers(prevNames => {
      return {
        ...prevNames,
        [symbol]: newName
      };
    });
  }

  const restartHandler = () => {
    setGameTurns(prevGame => []);
  };

  return (
    <main>
      {(winner || draw) && <GameOver winner={winner} onRestart={restartHandler}/>}
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={players.X} symbol="X" isActive={activePlayer === "X"} onSavePlayer={playerNameHandler} />
          <Player initName={players.O} symbol="O" isActive={activePlayer === "O"} onSavePlayer={playerNameHandler}/>
        </ol>
        <GameBoard board={gameBoard} onSelectSquare={selectSquareHandler} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
