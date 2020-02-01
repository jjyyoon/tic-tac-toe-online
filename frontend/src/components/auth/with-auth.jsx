import React from "react";

const WithAuth = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: null,
        userEmail: null
      };
    }

    async componentDidMount() {
      try {
        const res = await fetch("/auth");

        if (!res) throw new Error("Connection refused");

        if (!res.ok) {
          if (res.status === 401) {
            this.props.history.push("/signin");
          } else {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
        }

        const data = await res.json();
        this.setState({
          userName: data.user_name,
          userEmail: data.user_email
        });
      } catch (err) {
        console.log(err);
      }
    }

    render() {
      const { history, location } = this.props;
      const { userName, userEmail } = this.state;
      const currentUser = { userName, userEmail };

      return (
        userName && (
          <WrappedComponent
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