import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Row, Col } from "react-bootstrap";
import WithAuth from "../../components/auth/with-auth";
import GameContainer from "../../components/game-container/game-container.component";
import ChatWindow from "../../components/chat-window/chat-window.component";

class GamePage extends React.Component {
  componentDidMount() {
    const { currentUser, chatSocket, room } = this.props;
    chatSocket.emit("join", { username: currentUser.userName, room });
  }

  componentWillUnmount() {
    const { currentUser, chatSocket, room } = this.props;
    const username = currentUser.userName;
    chatSocket.emit("leave", { username, room });

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, room })
    };

    handleFetch("/leftroom", settings).then(() => {});
  }

  handleClick = () => {
    const { history } = this.props;
    history.push("/list");
  };

  render() {
    const { currentUser, chatSocket, room } = this.props;
    const username = currentUser.userName.toString();

    return (
      <Row className="game-page">
        <Col className="left">
          <GameContainer
            currentUser={username}
            chatSocket={chatSocket}
            roomId={room}
          />
        </Col>
        <Col className="right">
          <ChatWindow
            currentUser={currentUser}
            chatSocket={chatSocket}
            events={["load a chat", "join message", "leave message"]}
            roomId={room}
          />
        </Col>
      </Row>
    );
  }
}

export default withRouter(WithAuth(GamePage));
