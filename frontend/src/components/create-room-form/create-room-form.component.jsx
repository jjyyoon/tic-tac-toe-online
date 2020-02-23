import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Form } from "react-bootstrap";
import FormInput from "../form-input/form-input.component";

import "./create-room-form.styles.scss";

class CreateRoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSize: [3, 4, 5, 6],
      selectedSize: 3,
      checkboxChecked: false
    };
  }

  handleClick = () => {
    this.setState(state => ({ checkboxChecked: !state.checkboxChecked }));
  };

  handleClickRadio = e => {
    const sizeClicked = e.target.id;

    const { gameSize } = this.state;
    gameSize.map(num => {
      let size = `size${num}`;
      if (size === sizeClicked) {
        this.setState({ selectedSize: num });
      } else {
        document.getElementById(size).checked = false;
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { selectedSize, checkboxChecked } = this.state;
    const { userName } = this.props.currentUser;
    const roomName = e.target.roomName.value;
    let room;

    if (checkboxChecked) {
      const roomPassword = e.target.roomPassword.value;
      room = { roomName, roomPassword, userName, selectedSize };
    } else {
      room = { roomName, roomPassword: null, userName, selectedSize };
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
    const { gameSize, selectedSize, checkboxChecked } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} id="create-room-form">
        <FormInput name="roomName" type="text" label="Room Name" />
        <Form.Group>
          <p>
            Game Size <span>(3×3 or 4×4, etc.)</span>
          </p>
          {gameSize.map(num => (
            <Form.Check
              key={num}
              inline
              label={num}
              type="radio"
              id={`size${num}`}
              onClick={this.handleClickRadio}
              checked={num === selectedSize ? true : null}
            />
          ))}
        </Form.Group>
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
