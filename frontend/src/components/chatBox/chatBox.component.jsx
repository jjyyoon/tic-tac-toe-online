import React from "react";
import { withRouter } from "react-router";

import ListContainer from "../list-container/list-container.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./chatBox.styles.scss";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      chatInput: ""
    };

    const updateChat = message => {
      const { chat } = this.state;
      chat.push(message);
      this.setState({ chat });
    };

    const { socket } = this.props;
    socket.on("load a chat", message => updateChat(message));
    socket.on("join message", message => updateChat(message));
  }

  componentDidUpdate() {
    document
      .getElementsByClassName("list-container")[0]
      .lastChild.scrollIntoView();
  }

  handleSubmit = e => {
    e.preventDefault();
    document.querySelector(".form-control").value = "";

    const { socket, room, player } = this.props;
    const { chatInput } = this.state;
    const newMessage = `${player}:　${chatInput}`;
    socket.emit("chat", { newMessage, room });
    this.setState({ chatInput: "" });
  };

  handleChange = e => {
    this.setState({ chatInput: e.target.value });
  };

  render() {
    const { chat } = this.state;
    return (
      <div className="chat-box">
        <ListContainer arr={chat} />
        <form className="input-group mb-3" onSubmit={this.handleSubmit}>
          <FormInput name="message" type="text" onChange={this.handleChange} />
          <div className="input-group-append">
            <CustomButton type="submit" className="btn btn-outline-secondary">
              Send
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ChatBox);
