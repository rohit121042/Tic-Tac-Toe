import { useState } from "react";
import "../styles.css";
import Square from "./Square";
import Fab from "@mui/material/Fab";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GamesIcon from "@mui/icons-material/Games";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

export default function Board() {
  const [sqValue, setSqValue] = useState(Array(9).fill(null));
  const [isOTrue, setOTrue] = useState(true);
  const [playWithBot, setPlayWithBot] = useState(true);
  const [alertIsTrue, setAlertIsTrue] = useState(true);

  function handleClick(i) {
    if (calcWinner() || sqValue[i]) {
      return;
    }
    const newSqValue = sqValue.slice();

    if (playWithBot) {
      newSqValue[i] = "O";
      let j = Math.round(Math.random() * 8);
      while (newSqValue[j] && newSqValue.includes(null)) {
        j = Math.round(Math.random() * 8);
      }
      newSqValue.includes(null) && (newSqValue[j] = "X");
      setSqValue(newSqValue);
    } else {
      isOTrue ? (newSqValue[i] = "O") : (newSqValue[i] = "X");
      setOTrue(!isOTrue);
      setSqValue(newSqValue);
    }
  }
  function handlePlayWithBot() {
    setSqValue(Array(9).fill(null));
    setOTrue(true);
    setPlayWithBot(!playWithBot);
    setAlertIsTrue(true);
  }

  function calcWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (
        sqValue[x] &&
        sqValue[x] === sqValue[y] &&
        sqValue[y] === sqValue[z]
      ) {
        return lines[i];
      }
    }
    return null;
  }

  const winner = calcWinner() && sqValue[calcWinner()[0]];
  const winningLine = calcWinner() ? calcWinner() : Array(3).fill(null);
  let status;
  if (playWithBot && winner === "X") {
    status = "You Lost To A Bot 🤣";
  } else if (playWithBot && winner === "O") {
    status = "You Won 🎊💪";
  } else if (winner) {
    status = "Winner: " + winner + " 🎊💪";
  } else if (!sqValue.includes(null)) {
    status = "Draw 😥";
  } else if (playWithBot) {
    status = "Your Turn";
  } else {
    status = isOTrue ? "Next ☞ O" : "Next ☞ X";
  }

  return (
    <div className="board">
      <h1>
        <GamesIcon fontSize="small" />
        Tic-Tac-Toe
        <GamesIcon fontSize="small" />
      </h1>
      <h3>
        <Zoom in={true} timeout={1400}>
          <Fab variant="extended" onClick={handlePlayWithBot}>
            {!playWithBot ? "Play With Bot 🤖" : "Play with Human 🧔"}
          </Fab>
        </Zoom>
      </h3>

      <p>{playWithBot ? "🤖" : "🧔"}</p>

      {playWithBot && alertIsTrue && (
        <Slide in={alertIsTrue} timeout={210}>
          <Alert
            onClose={() => setAlertIsTrue(false)}
            variant="standard"
            severity="warning"
            color="error"
          >
            This Bot is a cheater, Watch out!
          </Alert>
        </Slide>
      )}
      <h3>
        <Zoom in={true} timeout={1400}>
          <Fab variant="extended" size="small">
            {status}{" "}
          </Fab>
        </Zoom>
      </h3>

      <div className="grid">
        <div className="row">
          <Square
            css={{ color: winningLine.includes(0) && "#40513B" }}
            value={sqValue[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            css={{ color: winningLine.includes(1) && "#40513B" }}
            value={sqValue[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            css={{ color: winningLine.includes(2) && "#40513B" }}
            value={sqValue[2]}
            onSquareClick={() => handleClick(2)}
          />
        </div>
        <div className="row">
          <Square
            css={{ color: winningLine.includes(3) && "#40513B" }}
            value={sqValue[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            css={{ color: winningLine.includes(4) && "#40513B" }}
            value={sqValue[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            css={{ color: winningLine.includes(5) && "#40513B" }}
            value={sqValue[5]}
            onSquareClick={() => handleClick(5)}
          />
        </div>
        <div className="row">
          <Square
            css={{ color: winningLine.includes(6) && "#40513B" }}
            value={sqValue[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            css={{ color: winningLine.includes(7) && "#40513B" }}
            value={sqValue[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            css={{ color: winningLine.includes(8) && "#40513B" }}
            value={sqValue[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>
      <p>
        <Zoom in={true} timeout={2800}>
          <Fab
            size="medium"
            className="restart"
            onClick={() => {
              setSqValue(Array(9).fill(null));
              setOTrue(true);
            }}
          >
            <RestartAltIcon />
          </Fab>
        </Zoom>
      </p>
    </div>
  );
}
