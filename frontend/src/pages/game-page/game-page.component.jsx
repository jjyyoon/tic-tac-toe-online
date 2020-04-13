import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Row, Col, Spinner } from "react-bootstrap";
import WithAuth from "../../components/auth/with-auth";
import GameContainer from "../../components/game-container/game-container.component";
import ChatWindow from "../../components/chat-window/chat-window.component";

import "./game-page.styles.scss";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedFull: false,
      full: null
    };
  }

  componentDidMount() {
    const { currentUser, chatSocket, room, history } = this.props;

    handleFetch("/check_availability", { roomId: room }).then(data => {
      if (data.count === 2) {
        this.setState({ full: true });
        history.push("/error", {
          heading: "Sorry, this room is now full :(",
          page: "list"
        });
      } else {
        this.setState({ checkedFull: true });
        chatSocket.emit("join", { username: currentUser.userName, room });
      }
    });
  }

  componentWillUnmount() {
    const { full } = this.state;

    if (!full) {
      const { currentUser, chatSocket, room } = this.props;
      const username = currentUser.userName;
      chatSocket.emit("leave", { username, room });

      handleFetch("/leftroom", { username, room });
    }
  }

  render() {
    const { checkedFull } = this.state;
    const { currentUser, chatSocket, room } = this.props;
    const username = currentUser.userName.toString();

    if (checkedFull) {
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
    } else {
      return (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
  }
}

export default withRouter(WithAuth(GamePage));
