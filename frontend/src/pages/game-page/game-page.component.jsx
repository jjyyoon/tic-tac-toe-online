import React from "react";
import { withRouter } from "react-router";
import io from "socket.io-client";

import WithAuth from "../../components/auth/with-auth";
import CustomButton from "../../components/custom-button/custom-button.component";
import Grid from "../../components/grid/grid.component";
import ChatBox from "../../components/chatBox/chatBox.component";

import "./game-page.styles.scss";

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const { currentUser, room } = props;

    this.state = {
      socket: io(),
      room,
      player: currentUser.userName,
      currentTurn: "Player 1"
    };
  }

  componentDidMount() {
    const { socket, room, player } = this.state;
    socket.emit("join", { username: player, room });
  }

  componentWillUnmount() {
    const { socket, room, player } = this.state;
    socket.emit("leave", { username: player, room });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push("/list");
  };

  changeTurn = () => {
    const { currentTurn } = this.state;
    if (currentTurn === "Player 1") {
      this.setState({ currentTurn: "Player 2" });
    } else {
      this.setState({ currentTurn: "Player 1" });
    }
  };

  render() {
    const { socket, room, player, currentTurn } = this.state;

    return (
      <div className="game-page">
        <CustomButton type="button" onClick={this.handleClick}>
          Leave
        </CustomButton>
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
          <ChatBox socket={socket} room={room} player={player} />
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(GamePage));
