import React from "react";

import "./create-room.styles.scss";

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleClick = () => {
    this.setState(state => ({ checked: !state.checked }));
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

    console.log(room);

    fetch("/createroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room)
    })
      .then(res => res.json())
      .then(data => console.log(data.room_id))
      .catch(err => console.log(err));
  };

  render() {
    const { checked } = this.state;

    return (
      <div class="modal fade" id="createRoomModal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create a Room</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={this.handleSubmit} id="createRoomForm">
                <div class="form-group">
                  <label class="col-form-label">Room Name:</label>
                  <input type="text" class="form-control" name="roomName" />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    onClick={this.handleClick}
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    Set a password for this room
                  </label>
                </div>
                {checked ? (
                  <div class="form-group">
                    <label class="col-form-label">Room Password:</label>
                    <input
                      type="password"
                      class="form-control"
                      name="roomPassword"
                    />
                  </div>
                ) : null}
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                form="createRoomForm"
              >
                Create a Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoom;
