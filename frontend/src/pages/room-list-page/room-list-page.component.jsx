import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import WithAuth from "../../components/auth/with-auth";
import CustomButton from "../../components/custom-button/custom-button.component";
import RoomList from "../../components/room-list/room-list.component";
import ListContainer from "../../components/list-container/list-container.component";

import "./room-list-page.styles.scss";

class RoomListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [
        { id: 1, name: "Let's Play!", NumOfPlayers: 1 },
        { id: 2, name: "Enjoy the time", NumOfPlayers: 2 }
      ],
      users: ["rui", "jiyeon", "sandra", "miguel", "mike", "julie"]
    };
  }

  handleClick = () => {
    fetch("/logout", { method: "POST" })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    const { rooms, users } = this.state;

    return (
      <div className="room-list-page">
        <div className="room-list">
          <h1 className="room-list-header">Rooms</h1>
          <CustomButton className="room-list-header">Create Room</CustomButton>
          <button onClick={this.handleClick}>Log out</button>
          <Link to="/game">game</Link>
          <div className="list-group">
            {rooms.map(room =>
              room.NumOfPlayers === 2 ? (
                <RoomList
                  key={room.id}
                  buttonColor="badge-secondary"
                  availability="Full"
                  to="#"
                >{`${room.name}　(${room.NumOfPlayers}/2)`}</RoomList>
              ) : (
                <RoomList
                  key={room.id}
                  buttonColor="badge-warning"
                  availability="Join"
                  to={`room/${room.id}`}
                >{`${room.name}　(${room.NumOfPlayers}/2)`}</RoomList>
              )
            )}
          </div>
        </div>
        <div className="user-list">
          <h1>Player Online</h1>
          <ListContainer arr={users} />
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(RoomListPage));
