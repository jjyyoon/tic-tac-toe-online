import React from "react";

import { handleFetch } from "../../handle-fetch";

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const StartGame = ({ roomId, player2 }) => {
  const handleClick = () => {
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, size: 3 })
    };

    handleFetch("/startgame", settings).then(() => {});
  };

  return (
    <Card.Body className="no-footer">
      <Button onClick={handleClick} disabled={player2 ? false : true}>
        Start Game
      </Button>
    </Card.Body>
  );
};

export default StartGame;
