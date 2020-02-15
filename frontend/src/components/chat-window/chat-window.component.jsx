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

    chatSocket.on("load a global chat", message => updateChat(message));
  }

  render() {
    const { chat } = this.state;
    const { chatSocket, currentUser } = this.props;

    return (
      <Card>
        <Card.Header as="h3">Chatroom</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              {chat.map((element, idx) => (
                <Card.Text key={idx}>{element}</Card.Text>
              ))}
            </Col>
            <UserListContainer chatSocket={chatSocket} />
          </Row>
        </Card.Body>
        <Card.Footer>
          <ChatInput
            chatSocket={chatSocket}
            currentUser={currentUser.userName}
          />
        </Card.Footer>
      </Card>
    );
  }
}

export default ChatWindow;
