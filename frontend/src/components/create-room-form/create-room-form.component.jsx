import React from "react";
import { withRouter } from "react-router";

import "./create-room-form.styles.scss";

class CreateRoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxChecked: false
    };
  }

  handleClick = () => {
    this.setState(state => ({ checkboxChecked: !state.checkboxChecked }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { userName } = this.props.currentUser;
    const roomName = e.target.roomName.value;
    let room;

    if (e.target.roomPassword) {
      const roomPassword = e.target.roomPassword.value;
      room = { roomName, roomPassword, userName };
    } else {
      room = { roomName, roomPassword: null, userName };
    }

    fetch("/createroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room)
    })
      .then(res => res.json())
      .then(data => {
        const { chatSocket, history } = this.props;
        chatSocket.emit("room created", { roomId: data.room_id });
        history.push(`/game/${data.room_id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { checkboxChecked } = this.state;

    return (
      <form onSubmit={this.handleSubmit} id="createRoomForm">
        <div className="form-group">
          <label className="col-form-label">Room Name:</label>
          <input type="text" className="form-control" name="roomName" />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onClick={this.handleClick}
          />
          <label className="form-check-label">
            Set a password for this room
          </label>
        </div>
        {checkboxChecked ? (
          <div className="form-group">
            <label className="col-form-label">Room Password:</label>
            <input
              type="password"
              className="form-control"
              name="roomPassword"
            />
          </div>
        ) : null}
      </form>
    );
  }
}

export default withRouter(CreateRoomForm);
