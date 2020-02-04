import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { handleFetch } from "../../handle-fetch";
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
      users: {}
    };

    const { chatSocket } = props;
    chatSocket.on("user is online", ({ user_name, user_email }) => {
      const { users } = this.state;
      users[user_name] = { user_name, user_email };
      this.setState({ users });
    });

    chatSocket.on("user is offline", user_name => {
      const { users } = this.state;
      delete users[user_name];
      this.setState({ users });
    });
  }

  componentDidMount() {
    handleFetch("/loadusers").then(({ data }) =>
      this.setState({ users: data.user_online })
    );
  }

  handleClick = () => {
    const { currentUser, history } = this.props;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: currentUser.userName })
    };

    handleFetch("/logout", settings).then(() => {
      history.push("/");
    });
  };

  render() {
    const { users } = this.state;
    const { chatSocket, currentUser } = this.props;
    const userNames = Object.keys(users);

    return (
      <div className="room-list-page">
        <div className="room-list">
          <h1 className="room-list-header">Rooms</h1>
          <CreateRoom chatSocket={chatSocket} currentUser={currentUser} />
          <CustomButton onClick={this.handleClick}>Log out</CustomButton>
          <RoomListContainer
            chatSocket={chatSocket}
            currentUser={currentUser}
          />
        </div>
        <div className="user-list">
          <h1>Player Online</h1>
          {userNames.length !== 0 ? <ListContainer arr={userNames} /> : null}
        </div>
      </div>
    );
  }
}

export default withRouter(WithAuth(RoomListPage));
