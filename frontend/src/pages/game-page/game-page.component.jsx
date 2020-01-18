import React from "react";

import Grid from "../../components/grid/grid.component";

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTurn: "player1"
    };
  }

  changeTurn = () => {
    const { currentTurn } = this.state;
    if (currentTurn === "player1") {
      this.setState({ currentTurn: "player2" });
    } else {
      this.setState({ currentTurn: "player1" });
    }
  };

  render() {
    const { currentTurn } = this.state;

    return (
      <div>
        <Grid
          player="player1"
          currentTurn={currentTurn}
          changeTurn={this.changeTurn}
          size={3}
        />
      </div>
    );
  }
}

export default GamePage;
