import React from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err_msg: null
    };
  }

  componentDidMount() {
    fetch("/auth").then(
      res => res.json(),
      err => {
        this.setState({ err_msg: err });
        this.props.history.push("/signin");
      }
    );
  }

  render() {
    // const { err_msg } = this.state;
    // return err_msg ? <Redirect to="/signin" /> : this.props.children;
    return this.props.children;
  }
}

export default withRouter(Auth);
