import React from "react";

import { handleFetch } from "../../handle-fetch";

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
    const { rooms } = this.state;
    const { currentUser } = this.props;

    const getInfo = room => {
      if (room.user1 && room.user2) {
        return {
          availability: false,
          str: `(2/2 : ${room.user1}, ${room.user2})`
        };
      } else if (room.user1 && !room.user2) {
        return { availability: true, str: `(1/2 : ${room.user1})` };
      } else {
        return { availability: true, str: `(0/2)` };
      }
    };

    return (
      <div className="room-list-container list-group">
        {rooms.map((room, index) => {
          let { availability, str } = getInfo(room);

          return (
            <RoomList
              key={index}
              room={room}
              availability={availability}
              currentUser={currentUser}
            >
              <p className="room-name">
                {room.name}
                <span>{` ${str}`}</span>
                <span className="created-by">{`　Created by ${room.created_by}`}</span>
              </p>
            </RoomList>
          );
        })}
      </div>
    );
  }
}

export default RoomListContainer;
