import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Card, Table } from "react-bootstrap";
import AlertBox from "../alert-box/alert-box.component";
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

    handleFetch("/loadgame", { gameId }).then(data => {
      const { grid, turn } = data;
      const spaceSize = `${Math.floor(100 / grid.length)}%`;
      this.setState({ grid, currentTurn: turn, spaceSize });
    });
  }

  render() {
    const { currentUser, otherPlayer, gameResult, readyToRestart } = this.props;
    const { grid, currentTurn, spaceSize } = this.state;

    let turn;
    if (currentUser === currentTurn) {
      turn = "Your Turn";
    } else {
      turn = `${otherPlayer}'s Turn`;
    }

    return (
      <Card.Body>
        <AlertBox
          color="success"
          heading={gameResult ? gameResult : turn}
          btnFunc={gameResult ? "close" : null}
          funcAdded={readyToRestart}
        />
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
                        {...this.props}
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
