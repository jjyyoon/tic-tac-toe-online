import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Col } from "react-bootstrap";

import "./space.styles.scss";

const Space = ({ value, x, y, currentUser, roomId, gameId, clickable }) => {
  const handleClick = e => {
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUser, roomId, gameId, x: x, y: y })
    };

    handleFetch("/checkgame", settings);
  };

  return (
    <Col
      as="button"
      onClick={handleClick}
      disabled={value === 0 && clickable ? false : true}
    >
      {value}
    </Col>
  );
};

export default Space;
