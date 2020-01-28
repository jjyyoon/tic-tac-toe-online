import React from "react";
import { withRouter } from "react-router";
import io from "socket.io-client";

import WithAuth from "../../components/auth/with-auth";
import Grid from "../../components/grid/grid.component";
import ChatBox from "../../components/chatBox/chatBox.component";

import "./game-page.styles.scss";

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const { userName } = props.currentUser;

    this.state = {
      player: userName,
      currentTurn: "Player 1",
      socket: io("http://127.0.0.1:5000/")
    };
  }

  componentDidMount() {
    console.log(this.props.currentUser.userName);
    console.log(this.state.player);
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
    const { player, currentTurn, socket } = this.state;

    return (
      <div className="game-page">
        <div className="player">
          <div>Player 1</div>
          <div>Player 2</div>
        </div>

        <div className="main">
          <div className="game-container">
            <h1 className="current-turn">{`${currentTurn} Turn`}</h1>

            <Grid
              player={player}
              currentTurn={currentTurn}
              changeTurn={this.changeTurn}
              size={3}
            />
          </div>
          <ChatBox player={player} socket={socket} />
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(GamePage));
