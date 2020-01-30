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
        {rooms.map((room, index) =>
          room.user1 && room.user2 ? (
            <RoomList
              key={index}
              buttonColor="badge-secondary"
              availability="Full"
              path={`/game/${room.id}`}
              password={room.password}
            >{`${room.name}　(2/2)`}</RoomList>
          ) : (
            <RoomList
              key={index}
              buttonColor="badge-warning"
              availability="Join"
              path={`/game/${room.id}`}
              password={room.password}
            >{`${room.name}　(1/2)`}</RoomList>
          )
        )}
      </div>
    );
  }
}

export default RoomListContainer;
