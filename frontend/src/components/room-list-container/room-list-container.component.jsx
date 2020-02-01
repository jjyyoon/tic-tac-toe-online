import React from "react";

import RoomList from "../../components/room-list/room-list.component";

class RoomListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    fetch("/loadrooms")
      .then(res => res.json())
      .then(data => this.setState({ rooms: data.rooms }))
      .catch(err => console.log(err));
  }

  render() {
    const { rooms } = this.state;

    return (
      <div className="list-group">
        {rooms.map((room, index) => (
          <RoomList
            key={index}
            availability={room.user1 && room.user2 ? "Full" : "Join"}
            roomId={room.id}
            password={room.password}
          >
            {room.name}
          </RoomList>
        ))}
      </div>
    );
  }
}

export default RoomListContainer;
