import React from "react";

import { handleFetch } from "../../handle-fetch";

import { Card, Col } from "react-bootstrap";

class UserListContainer extends React.Component {
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
    handleFetch("/loadusers").then(data =>
      this.setState({ users: data.user_online })
    );
  }

  render() {
    const { users } = this.state;
    const usernames = Object.keys(users);

    return (
      <Col md="auto">
        <Card.Title as="h5">Online users</Card.Title>

        {users.length !== 0
          ? usernames.map((user, idx) => (
              <Card.Text key={idx}>{user}</Card.Text>
            ))
          : null}
      </Col>
    );
  }
}

export default UserListContainer;
