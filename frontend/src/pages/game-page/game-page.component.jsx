import React from "react";

import Grid from "../../components/grid/grid.component";
import ChatBox from "../../components/chatBox/chatBox.component";

import "./game-page.styles.scss";

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: "Player 1",
      currentTurn: "Player 1"
    };
  }

  changeTurn = () => {
    const { currentTurn } = this.state;
    if (currentTurn === "Player 1") {
      this.setState({ currentTurn: "Player 2" });
    } else {
      this.setState({ currentTurn: "Player 1" });
    }
  };

  render() {
    const { player, currentTurn } = this.state;

    return (
      <div>
        <div className="player">
          <div>Player 1</div>
          <div>Player 2</div>
        </div>

        <div className="main">
          <div className="gameContainer">
            <h1>{`${currentTurn} Turn`}</h1>

            <Grid
              player={player}
              currentTurn={currentTurn}
              changeTurn={this.changeTurn}
              size={3}
            />
          </div>
          <div className="chatContainer">
            <ChatBox player={player} />
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;
