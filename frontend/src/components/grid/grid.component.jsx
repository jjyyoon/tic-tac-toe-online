import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Card, Row } from "react-bootstrap";
import Space from "../space/space.component";

import "./grid.styles.scss";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: null,
      currentTurn: null
    };

    const { gameSocket } = props;
    gameSocket.on("update a game", ({ grid, turn }) => {
      this.setState({ grid, currentTurn: turn });
    });
  }

  componentDidMount() {
    const { gameId } = this.props;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId })
    };

    handleFetch("/loadgame", settings).then(({ data }) => {
      const { grid, turn } = data;
      this.setState({ grid, currentTurn: turn });
      console.log(this.state);
    });
  }

  render() {
    const { currentUser, otherPlayer, roomId, gameId } = this.props;
    const { grid, currentTurn } = this.state;

    return (
      <Card.Body className="no-footer">
        <Card.Title>
          {currentUser === currentTurn ? "Your Turn" : `${otherPlayer}'s Turn`}
        </Card.Title>
        {grid
          ? grid.map((row, rowIdx) => (
              <Row key={rowIdx}>
                {row.map((col, colIdx) => (
                  <Space
                    key={`${rowIdx}${colIdx}`}
                    value={col}
                    x={rowIdx}
                    y={colIdx}
                    currentUser={currentUser}
                    roomId={roomId}
                    gameId={gameId}
                    clickable={currentUser === currentTurn ? true : false}
                  />
                ))}
              </Row>
            ))
          : null}
      </Card.Body>
    );
  }
}

export default Grid;
