import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Form } from "react-bootstrap";
import FormInput from "../form-input/form-input.component";

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

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room)
    };

    handleFetch("/createroom", settings).then(({ data }) => {
      const { chatSocket, history } = this.props;
      chatSocket.emit("room created", { roomId: data.room_id });
      history.push(`/game/${data.room_id}`);
    });
  };

  render() {
    const { checkboxChecked } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} id="create-room-form">
        <FormInput name="roomName" type="text" label="Room Name" />
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Set a password for this room"
            onClick={this.handleClick}
          />
        </Form.Group>
        {checkboxChecked ? (
          <FormInput
            name="roomPassword"
            type="password"
            label="Room Password"
          />
        ) : null}
      </Form>
    );
  }
}

export default withRouter(CreateRoomForm);
