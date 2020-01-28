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
      const res = await fetch("/auth");

      if (res) {
        if (res.status === 401) {
          this.props.history.push("/signin");
        } else {
          const data = await res.json();
          this.setState({
            userName: data.user_name,
            userEmail: data.user_email
          });
        }
      }
    }

    render() {
      const { userName, userEmail } = this.state;
      const currentUser = { userName, userEmail };

      return <WrappedComponent currentUser={currentUser} />;
    }
  };
};

export default WithAuth;
