import React from "react";
import { Card } from "react-bootstrap";

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
      <Card className="chatbox">
        <Card.Header>Chatroom</Card.Header>
        <Card.Body>
          {chat.map((element, idx) => (
            <Card.Text key={idx}>{element}</Card.Text>
          ))}
        </Card.Body>
        <Card.Footer>
          <ChatInput
            chatSocket={chatSocket}
            currentUser={currentUser.userName}
          ></ChatInput>
        </Card.Footer>
      </Card>
    );
  }
}

export default ChatWindow;
