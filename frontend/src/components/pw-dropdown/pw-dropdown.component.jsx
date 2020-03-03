import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Form } from "react-bootstrap";
import FormInput from "../form-input/form-input.component";

class PwDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { roomId, history } = this.props;
    const password = e.target.password.value;

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, password })
    };

    handleFetch("/pwcheck", settings).then(({ data }) => {
      if (data.match) {
        history.push(`/game/${roomId}`);
      } else {
        this.setState({ err: "Wrong password for this room!" });
      }
    });
  };

  render() {
    const { err } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} id="room-password-form">
        <FormInput
          name="password"
          type="password"
          label="Password"
          errorMessage={err}
        />
      </Form>
    );
  }
}

export default withRouter(PwDropdown);
