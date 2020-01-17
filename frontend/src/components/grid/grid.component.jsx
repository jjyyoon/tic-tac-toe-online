import React from "react";
import Space from "../space/space.component";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ]
    };
  }

  render() {
    return <div></div>;
  }
}

export default Grid;
