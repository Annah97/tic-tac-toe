import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setPlayer("O");
  }

  useEffect(() => {

    const winnerPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    const checkTie = () => {
      let boardFull = true;
      board.forEach((square) => {
        if (square === "") {
          boardFull = false;
        }
      });

      if (boardFull) {
        setResult({ winner: "None", state: "Draw" });
      }
    }

    const checkWinner = () => {
      winnerPattern.forEach((currPattern) => {
        const firstToPlay = board[currPattern[0]];
        if (firstToPlay === "") return;
        let isWinningPattern = true;
        currPattern.forEach((ind) => {
          if (board[ind] !== firstToPlay) {
            isWinningPattern = false;
          }
        });

        if (isWinningPattern) {
          setResult({ winner: player, state: "Winner" });
        }
      });
    }

    checkTie();
    checkWinner();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    const brd = document.getElementsByClassName("App-board")[0];
    if (result.state === "Winner") {
      if (player === "O") {
        brd.classList.replace("App-board", "App-xwinner");
      } else {
        brd.classList.replace("App-board", "App-owinner");
      }
    } else if (result.state === "Draw") {
      brd.className = "App-draw";
    }
    restartGame();
  }, [result]);

  const currentSquare = (square) => {
    setBoard(
      board.map((val, ind) => {
        if (ind === square && val === "") {
          return player;
        }
        return val;
      })
    );
  };



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a Tic Tac Toe ACA Challenge Game
          <br />
          Developed by:
          <span>
            <a
              className="App-link"
              href="https://github.com/Annah97"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rapelang
            </a>
          </span>
        </p>
      </header>
      <br />
      <div className='App-board'>
        <Square val={board[0]} chooseSquare={() => currentSquare(0)} />
        <Square val={board[1]} chooseSquare={() => currentSquare(1)} />
        <Square val={board[2]} chooseSquare={() => currentSquare(2)} />
        <Square val={board[3]} chooseSquare={() => currentSquare(3)} />
        <Square val={board[4]} chooseSquare={() => currentSquare(4)} />
        <Square val={board[5]} chooseSquare={() => currentSquare(5)} />
        <Square val={board[6]} chooseSquare={() => currentSquare(6)} />
        <Square val={board[7]} chooseSquare={() => currentSquare(7)} />
        <Square val={board[8]} chooseSquare={() => currentSquare(8)} />
      </div>
      <br />
      <button className="App-button" onClick={() => window.location.reload()}>Restart Game</button>
      <br />
    </div>
  );
}

export default App;
