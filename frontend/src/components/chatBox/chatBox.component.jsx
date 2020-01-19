import React from "react";
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
  }

  handleClick = () => {
    document.querySelector(".form-control").value = "";

    const { player } = this.props;

    const newChat = this.state.chat.slice();
    newChat.push(`${player}:　${this.state.chatInput}`);
    this.setState({ chat: newChat, chatInput: "" });
  };

  handleChange = e => {
    this.setState({ chatInput: e.target.value });
  };

  render() {
    const { chat } = this.state;
    return (
      <div className="chat-box">
        <div className="chat-screen">
          {chat.map((element, idx) => (
            <p key={idx}>{element}</p>
          ))}
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <CustomButton
              className="btn btn-outline-secondary"
              type="button"
              handleClick={this.handleClick}
            >
              Send
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
