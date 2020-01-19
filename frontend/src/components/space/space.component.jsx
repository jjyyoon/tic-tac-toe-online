import React from "react";

import "./space.styles.scss";

const Space = ({ player, currentTurn, update, validate, i, j }) => {
  const mark = player === "Player 1" ? "O" : "X";
  const handleClick = e => {
    if (player === currentTurn) {
      e.target.innerHTML = mark;
      update(i, j, mark);
      validate();
    }
  };

  return <div className="space" onClick={handleClick}></div>;
};

export default Space;
