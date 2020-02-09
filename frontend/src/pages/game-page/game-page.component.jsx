import React from "react";
import { withRouter } from "react-router";

import WithAuth from "../../components/auth/with-auth";
import CustomButton from "../../components/custom-button/custom-button.component";
import GameContainer from "../../components/game-container/game-container.component";
import ChatBox from "../../components/chatBox/chatBox.component";

import "./game-page.styles.scss";

class GamePage extends React.Component {
  componentDidMount() {
    const { currentUser, chatSocket, room } = this.props;
    chatSocket.emit("join", { username: currentUser.userName, room });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push("/list");
  };

  render() {
    const { currentUser, chatSocket, room } = this.props;
    const username = currentUser.userName.toString();

    return (
      <div className="game-page">
        <CustomButton type="button" onClick={this.handleClick}>
          Leave
        </CustomButton>
        <div className="main">
          <GameContainer
            currentUser={username}
            chatSocket={chatSocket}
            roomId={room}
          ></GameContainer>
          <ChatBox chatSocket={chatSocket} room={room} currentUser={username} />
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(GamePage));
