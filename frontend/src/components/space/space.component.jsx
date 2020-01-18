import React from "react";

import "./space.styles.scss";

const Space = ({ player, update, validate, i, j }) => {
  const mark = player === "player1" ? "O" : "X";
  const handleClick = event => {
    event.target.innerHTML = mark;
    update(i, j, mark);
    validate();
  };

  return <div className="space" onClick={handleClick}></div>;
};

export default Space;
