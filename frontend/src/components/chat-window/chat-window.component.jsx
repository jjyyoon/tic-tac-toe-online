import React from "react";

import { Row, Col, Card } from "react-bootstrap";
import UserListContainer from "../user-list-container/user-list-container";
import ChatInput from "../chat-input/chat-input";

import "./chat-window.styles.scss";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: [] };

    const { chatSocket } = props;
    const updateChat = message => {
      const { chat } = this.state;
      chat.push(message);
      this.setState({ chat });
    };

    const { events } = props;
    events.map(event => chatSocket.on(event, message => updateChat(message)));
  }

  componentDidUpdate() {
    document.getElementById("chatroom").lastChild.scrollIntoView();
  }

  render() {
    const { chat } = this.state;
    const { chatSocket, currentUser, userList, roomId } = this.props;

    return (
      <Card>
        <Card.Header as="h3">Chatroom</Card.Header>
        <Card.Body>
          <Row>
            <Col id="chatroom">
              {chat.map((element, idx) => (
                <Card.Text key={idx}>{element}</Card.Text>
              ))}
            </Col>
            {userList ? <UserListContainer chatSocket={chatSocket} /> : null}
          </Row>
        </Card.Body>
        <Card.Footer>
          <ChatInput
            chatSocket={chatSocket}
            currentUser={currentUser.userName}
            roomId={roomId}
          />
        </Card.Footer>
      </Card>
    );
  }
}

export default ChatWindow;
