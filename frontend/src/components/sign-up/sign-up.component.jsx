import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Col, Form, Button } from "react-bootstrap";
import FormInput from "../form-input/form-input.component";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errUserName: null,
      errEmail: null,
      errPassword: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ errUserName: null, errEmail: null, errPassword: null });
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      this.setState({
        errPassword: "*Those passwords didn't match, please try again."
      });
      document.getElementById("sign-up-password").value = "";
      return;
    }

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password })
    };

    handleFetch("/register", settings).then(({ data }) => {
      if (data.user_name) {
        this.props.history.push("/list");
        return;
      }

      if (data.err === "username") {
        this.setState({
          errUserName: "*This username is taken, please try another."
        });
      } else {
        this.setState({
          errEmail: "*This email is taken, please try another."
        });
      }
    });
  };

  render() {
    const { errUserName, errEmail, errPassword } = this.state;
    return (
      <Col className="right">
        <h3>I don't have an account.</h3>
        <p>Sign up with your email and password.</p>
        <Form onSubmit={this.handleSubmit}>
          <FormInput
            name="username"
            type="text"
            id="sign-up-username"
            label="Username"
            errorMessage={errUserName ? errUserName : null}
          />
          <FormInput
            name="email"
            type="email"
            id="sign-up-email"
            label="Email Address"
            errorMessage={errEmail ? errEmail : null}
          />
          <FormInput name="password" type="password" label="Password" />
          <FormInput
            name="confirmPassword"
            type="password"
            id="sign-up-password"
            label="Confirm Password"
            errorMessage={errPassword ? errPassword : null}
          />
          <Button type="submit" variant="warning" size="lg" block>
            Sign Up
          </Button>
        </Form>
      </Col>
    );
  }
}

export default withRouter(SignUp);
