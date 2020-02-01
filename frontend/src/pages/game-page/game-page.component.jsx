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
      chatSocket: io("/chat"),
      gameSocket: io("/game"),
      currentUser: currentUser.userName,
      room,
      player1: null,
      player2: null,
      currentTurn: "Player 1"
    };

    const { chatSocket } = this.state;
    chatSocket.on("get players", ({ player1, player2 }) => {
      this.setState({ player1, player2 });
    });
  }

  componentDidMount() {
    const { chatSocket, currentUser, room } = this.state;
    chatSocket.emit("join", { username: currentUser, room });
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
    const {
      chatSocket,
      currentUser,
      room,
      player1,
      player2,
      currentTurn
    } = this.state;

    return (
      <div className="game-page">
        <CustomButton type="button" onClick={this.handleClick}>
          Leave
        </CustomButton>
        <div className="player">
          <div>
            <h6>Player 1</h6>
            {player1 ? <p>{player1}</p> : null}
          </div>
          <div>
            {" "}
            <h6>Player 2</h6>
            {player2 ? <p>{player2}</p> : null}
          </div>
        </div>

        <div className="main">
          <div className="game-container">
            <h1 className="current-turn">{`${currentTurn} Turn`}</h1>

            <Grid
              player={currentUser}
              currentTurn={currentTurn}
              changeTurn={this.changeTurn}
              size={3}
            />
          </div>
          <ChatBox
            chatSocket={chatSocket}
            room={room}
            currentUser={currentUser}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(GamePage));
