import React from "react";
import { withRouter } from "react-router";

import { Row, Col } from "react-bootstrap";
import WithAuth from "../../components/auth/with-auth";
import GameContainer from "../../components/game-container/game-container.component";
import ChatBox from "../../components/chatBox/chatBox.component";

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
      <Row className="game-page">
        <Col className="left">
          <GameContainer
            currentUser={username}
            chatSocket={chatSocket}
            roomId={room}
          />
        </Col>
        <Col className="right">
          <ChatBox chatSocket={chatSocket} room={room} currentUser={username} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(WithAuth(GamePage));
