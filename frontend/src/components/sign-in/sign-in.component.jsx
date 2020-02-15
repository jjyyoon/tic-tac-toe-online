import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Col, Form, Button } from "react-bootstrap";
import FormInput from "../form-input/form-input.component";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    };

    handleFetch("/login", settings).then(({ data }) => {
      if (data.user_name) {
        this.props.history.push("/list");
      } else {
        this.setState({
          err: "*Invalid email or password, please try again."
        });
      }
    });
  };

  render() {
    const { err } = this.state;

    return (
      <Col className="left">
        <h3>I already have an account.</h3>
        <p>Sign in with your email and password.</p>
        <Form onSubmit={this.handleSubmit}>
          <FormInput name="email" type="email" label="Email Address" />
          <FormInput
            name="password"
            type="password"
            label="Password"
            errorMessage={err ? err : null}
          />
          <Button type="submit" variant="warning" size="lg" block>
            Sign In
          </Button>
        </Form>
      </Col>
    );
  }
}

export default withRouter(SignIn);
