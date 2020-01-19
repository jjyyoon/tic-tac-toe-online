import React from "react";
import Space from "../space/space.component";

import "./grid.styles.scss";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.createGrid(props.size)
    };
  }

  createGrid = size => {
    let grid = [];
    for (let i = 0; i < size; i = i + 1) {
      let row = [];
      for (let j = 0; j < size; j = j + 1) {
        row.push("");
      }
      grid.push(row);
    }

    return grid;
  };

  updateState = (i, j, mark) => {
    const newGrid = this.state.grid.slice();
    newGrid[i][j] = mark;

    this.setState({ grid: newGrid });
    this.props.changeTurn();
  };

  validate = () => {};

  render() {
    const { grid } = this.state;
    const { player, currentTurn } = this.props;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((col, colIdx) => (
              <Space
                key={`${rowIdx}${colIdx}`}
                player={player}
                currentTurn={currentTurn}
                update={this.updateState}
                validate={this.validate}
                i={rowIdx}
                j={colIdx}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;
