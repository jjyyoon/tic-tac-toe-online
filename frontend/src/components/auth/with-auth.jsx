import React from "react";
import io from "socket.io-client";

import { handleFetch } from "../../handle-fetch";

const WithAuth = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chatSocket: io("/chat"),
        userName: null,
        userEmail: null
      };
    }

    componentDidMount() {
      handleFetch("/auth", null, 401).then(({ data }) => {
        if (!data) {
          alert("You are not authorized to view this page, please sign in.");
          this.props.history.push("/signin");
        } else {
          this.setState({
            userName: data.user_name,
            userEmail: data.user_email
          });
        }
      });
    }

    render() {
      const { history, location } = this.props;
      const { chatSocket, userName, userEmail } = this.state;
      const currentUser = { userName, userEmail };

      return (
        userName && (
          <WrappedComponent
            chatSocket={chatSocket}
            currentUser={currentUser}
            history={history}
            room={location.pathname.substr(6)}
          />
        )
      );
    }
  };
};

export default WithAuth;
