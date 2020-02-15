import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Card, Table } from "react-bootstrap";
import Space from "../space/space.component";

import "./grid.styles.scss";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: null,
      currentTurn: null,
      spaceSize: null
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
      const spaceSize = `${Math.floor(100 / grid.length)}%`;
      this.setState({ grid, currentTurn: turn, spaceSize });
    });
  }

  render() {
    const { currentUser, otherPlayer, roomId, gameId } = this.props;
    const { grid, currentTurn, spaceSize } = this.state;

    return (
      <Card.Body>
        <span>
          {currentUser === currentTurn ? "Your Turn" : `${otherPlayer}'s Turn`}
        </span>
        <Table>
          <tbody>
            {grid
              ? grid.map((row, rowIdx) => (
                  <tr key={rowIdx} height={spaceSize}>
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
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Card.Body>
    );
  }
}

export default Grid;
