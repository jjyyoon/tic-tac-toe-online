import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import WithAuth from "../../components/auth/with-auth";
import CustomButton from "../../components/custom-button/custom-button.component";
import RoomListContainer from "../../components/room-list-container/room-list-container.component";
import ListContainer from "../../components/list-container/list-container.component";
import CreateRoom from "../../components/create-room/create-room.component";

import "./room-list-page.styles.scss";

class RoomListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { users } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="room-list-page">
        <div className="room-list">
          <h1 className="room-list-header">Rooms</h1>
          <CreateRoom currentUser={currentUser} />
          <button onClick={this.handleClick}>Log out</button>
          <Link to="/game">game</Link>
          <RoomListContainer />
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
