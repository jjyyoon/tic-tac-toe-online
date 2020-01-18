import React from "react";
import Space from "../space/space.component";

import "./grid.styles.scss";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    const createGrid = size => {
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

    this.state = {
      grid: createGrid(props.size)
    };
  }

  updateState = (i, j, mark) => {
    const newGrid = this.state.grid.slice();
    newGrid[i][j] = mark;

    this.setState({ grid: newGrid });
    console.log(this.state.grid);
  };

  validate = () => {};

  render() {
    const { grid } = this.state;

    return (
      <div>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((col, colIdx) => (
              <Space
                key={`${rowIdx}${colIdx}`}
                player="player1"
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
