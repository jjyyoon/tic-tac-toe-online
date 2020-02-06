import React from "react";

import { FormControl, InputGroup, Button } from "react-bootstrap";

const ChatInput = ({ currentUser, chatSocket, room }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const chatInput = e.target.message.value;
    const newMessage = `${currentUser}:　${chatInput}`;

    if (room) {
      chatSocket.emit("chat", { newMessage, room });
    } else {
      chatSocket.emit("chat", { newMessage, room: null });
    }

    document.querySelector(".form-control").value = "";
  };

  return (
    <InputGroup as="form" className="mb-3" onSubmit={handleSubmit}>
      <FormControl name="message" placeholder="Enter a message." />
      <InputGroup.Append>
        <Button variant="outline-dark" type="submit">
          Send
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default ChatInput;
