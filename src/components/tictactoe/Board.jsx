import React from "react";
import Cell from "./Cell";

const Board = ({ cells, onClick }) => {
  return (
    <div className="game-board">
      {cells.map((item, index) => (
        <Cell
          className={
            item !== null && item === "X" ? "is-x" : item === "O" ? "is-o" : ""
          }
          key={index}
          value={item}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
