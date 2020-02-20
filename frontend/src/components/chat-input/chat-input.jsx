import React from "react";

import { FormControl, InputGroup, Button } from "react-bootstrap";

const ChatInput = ({ currentUser, chatSocket, roomId }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const chatInput = e.target.message.value;
    const newMessage = `${currentUser}:　${chatInput}`;

    if (roomId) {
      chatSocket.emit("chat", { newMessage, roomId });
    } else {
      chatSocket.emit("chat", { newMessage, roomId: null });
    }

    document.querySelector(".form-control").value = "";
  };

  return (
    <InputGroup as="form" onSubmit={handleSubmit}>
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
