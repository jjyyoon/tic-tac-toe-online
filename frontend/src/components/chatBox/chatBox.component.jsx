import React from "react";
import CustomButton from "../custom-button/custom-button.component";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: ["Hello", "How are you today?"],
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
      <div>
        <div className="chat-box">
          {chat.map((element, idx) => (
            <p key={idx}>{element}</p>
          ))}
        </div>
        <div className="form-inline">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
          <CustomButton
            className="btn btn-outline-secondary"
            handleClick={this.handleClick}
          >
            Send
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default ChatBox;
