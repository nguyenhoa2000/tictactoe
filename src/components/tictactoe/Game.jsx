import React, { useState, useReducer } from "react";
import Board from "./Board";
import "./gameStyle.css";
import { calculateWinner } from "../../helpers";

// initialState
const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
};

// type
const initialType = {
  CLICK: "CLICK",
  RESET: "RESET",
};

// actions
const turn = (payload) => ({ type: initialType.CLICK, payload });
const resetGame = () => ({ type: initialType.RESET });

// reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case initialType.CLICK:
      const { board, xIsNext } = state;
      const { winner, index } = action.payload;
      if (winner || board[index]) return state;
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.board[index] = xIsNext ? "X" : "O";
      nextState.xIsNext = !xIsNext;
      return nextState;

    case initialType.RESET:
      return {
        ...state,
        board: Array(9).fill(null),
        xIsNext: true,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // const action= {type:'click', payload:{}}
  // const [state, setState] = useState({
  //   board: Array(9).fill(null),
  //   xIsNext: true,
  // });
  const winner = calculateWinner(state.board);

  const handleClick = (index) => {
    // const boardCopy = [...state.board];
    // if (winner || boardCopy[index]) return;
    dispatch(turn({ index, winner }));
    // boardCopy[index] = state.xIsNext ? "X" : "O";
    // setState({ ...state, board: boardCopy, xIsNext: !state.xIsNext });
  };

  const handleReset = () => {
    // setState({ ...state, board: Array(9).fill(null), xIsNext: true });
    dispatch(resetGame());
  };

  return (
    <>
      <Board cells={state.board} onClick={handleClick} />
      <div>
        {winner
          ? `the person victory ${winner}`
          : state.board.every((item) => item !== null)
          ? `don't have the person victory`
          : ""}
      </div>
      <button className="btn-reset" onClick={() => handleReset()}>
        Reset game
      </button>
    </>
  );
};

export default Game;
