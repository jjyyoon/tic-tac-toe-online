import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Button } from "react-bootstrap";

import "./space.styles.scss";

const Space = ({ value, x, y, currentUser, roomId, gameId, clickable }) => {
  const handleClick = e => {
    handleFetch("/checkgame", { currentUser, roomId, gameId, x: x, y: y });
  };

  let color;
  let mark;

  if (value === 1) {
    color = "primary";
    mark = "O";
  } else if (value === 2) {
    color = "danger";
    mark = "X";
  }

  return (
    <td>
      <Button
        variant={value === 0 ? "outline-dark" : color}
        onClick={handleClick}
        disabled={value === 0 && clickable ? false : true}
      >
        <h1>{value === 0 ? null : mark}</h1>
      </Button>
    </td>
  );
};

export default Space;
