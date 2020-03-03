import React from "react";

import { handleFetch } from "../../handle-fetch";

import { Card, ListGroup } from "react-bootstrap";
import CustomModal from "../../components/custom-modal/custom-modal.component";
import CreateRoomForm from "../create-room-form/create-room-form.component";
import RoomList from "../../components/room-list/room-list.component";

import "./room-list-container.styles.scss";

class RoomListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };

    const { chatSocket } = props;

    chatSocket.on("update rooms", updatedRoom => {
      const { rooms } = this.state;
      const idx = rooms.findIndex(room => room.id === updatedRoom.id);

      if (idx === -1) {
        rooms.push(updatedRoom);
      } else if (updatedRoom.deleted) {
        rooms.splice(idx, 1);
      } else {
        rooms[idx] = updatedRoom;
      }

      this.setState({ rooms });
    });
  }

  componentDidMount() {
    handleFetch("/loadrooms").then(({ data }) =>
      this.setState({ rooms: data.rooms })
    );
  }

  render() {
    const { currentUser, chatSocket } = this.props;
    const { rooms } = this.state;

    return (
      <Card>
        <Card.Header as="h3">
          Rooms
          <CustomModal
            color="info"
            title="Create a Room"
            header={true}
            form="create-room-form"
          >
            <CreateRoomForm chatSocket={chatSocket} currentUser={currentUser} />
          </CustomModal>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {rooms.map((room, index) => (
              <RoomList key={index} currentUser={currentUser} room={room} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default RoomListContainer;
