import React from "react";

import { handleFetch } from "../../handle-fetch";

import { Card, Button } from "react-bootstrap";

import "./start-game.styles.scss";

const StartGame = ({ roomId, player2 }) => {
  const handleClick = () => {
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId })
    };

    handleFetch("/startgame", settings).then(() => {});
  };

  return (
    <Card.Body className="start-game">
      <Button
        variant={player2 ? "warning" : "secondary"}
        size="lg"
        disabled={player2 ? false : true}
        onClick={player2 ? handleClick : null}
      >
        {player2 ? "START THE GAME" : "PLEASE WAIT FOR ANOTHER PLAYER"}
      </Button>
    </Card.Body>
  );
};

export default StartGame;
