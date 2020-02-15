import React from "react";
import io from "socket.io-client";

import { Card } from "react-bootstrap";
import StartGame from "../start-game/start-game.component";
import Grid from "../grid/grid.component";

import "./game-container.styles.scss";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSocket: io("/game"),
      gameState: false,
      gameId: null,
      player1: null,
      player2: null
    };

    const { chatSocket } = props;
    chatSocket.on("update players", ({ player1, player2 }) => {
      this.setState({ player1, player2 });
    });

    const { gameSocket } = this.state;
    gameSocket.on("game started", game_id => {
      this.setState({ gameState: true, gameId: game_id });
    });

    gameSocket.on("game finished", message => {
      alert(message);
      this.setState({ gameState: false });
    });
  }

  componentDidMount() {
    const { gameSocket } = this.state;
    const { roomId } = this.props;
    gameSocket.emit("join", { roomId });
  }

  render() {
    const { roomId, currentUser } = this.props;
    const { gameSocket, gameState, gameId, player1, player2 } = this.state;
    let otherPlayer;
    if (player1 === currentUser) {
      otherPlayer = player2;
    } else {
      otherPlayer = player1;
    }

    return (
      <Card>
        <Card.Header as="h3">
          <span>
            <h6>Player 1:</h6> {player1}
          </span>
          <div>
            <h6>Player 2:</h6> {player2 ? player2 : "Waiting"}
          </div>
        </Card.Header>
        {gameState ? (
          <Grid
            gameSocket={gameSocket}
            roomId={roomId}
            gameId={gameId}
            currentUser={currentUser}
            otherPlayer={otherPlayer}
          />
        ) : (
          <StartGame roomId={roomId} player2={player2} />
        )}
      </Card>
    );
  }
}

export default GameContainer;
