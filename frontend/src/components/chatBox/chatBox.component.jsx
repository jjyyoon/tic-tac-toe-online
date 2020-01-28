import React from "react";

import ListContainer from "../list-container/list-container.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./chatBox.styles.scss";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [
        "Hello",
        "How are you today?",
        "How are you today?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "Hello",
        "How are you today?",
        "How are you today?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "Hello",
        "How are you today?",
        "How are you today?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?",
        "What did you do yesterday?"
      ],
      chatInput: ""
    };

    const { socket } = this.props;
    socket.on("load a chat", msg => {
      const { chat } = this.state;
      chat.push(msg);
      this.setState({ chat });
    });
  }

  componentDidUpdate() {
    document
      .getElementsByClassName("list-container")[0]
      .lastChild.scrollIntoView();
  }

  handleSubmit = e => {
    e.preventDefault();
    document.querySelector(".form-control").value = "";

    const { player, socket } = this.props;
    const { chatInput } = this.state;
    const newMessage = `${player}:　${chatInput}`;
    socket.emit("chat", newMessage);
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
            <CustomButton className="btn btn-outline-secondary" type="button">
              Send
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default ChatBox;
