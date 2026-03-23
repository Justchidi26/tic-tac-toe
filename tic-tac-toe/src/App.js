import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );

  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue("X");
  // }

  // return (
  //   <button className="square" onClick={handleClick}>
  //     {value}
  //   </button>
  // );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return; // To check if an X or O exits in the box
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //Let them know who won
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Congratulations!!! Winner is " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div> {/*Display the next player or winner */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        {/* An arrow function  is added => */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  // All possible winning combinations (rows, columns, diagonals)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Loop through each winning combination
  for (let i = 0; i < lines.length; i++) {
    // Destructure the indices for the current combination
    const [a, b, c] = lines[i];

    // Check if:
    // 1. The first square is not empty (truthy)
    // 2. All three squares have the same value (X or O)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If a winning combination is found, return the winner (X or O)
      return squares[a];
    }
  }

  // If no winner is found, return null
  return null;
}
