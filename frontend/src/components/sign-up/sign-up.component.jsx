import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.styles.scss";

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
    const userName = e.target.userName.value;
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
      <div className="sign-up">
        <h3>I don't have an account</h3>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="sign-up-username"
            label="User Name"
            name="userName"
            type="text"
          />
          {errUserName ? <p className="error">{errUserName}</p> : null}
          <FormInput
            id="sign-up-email"
            label="Email Address"
            name="email"
            type="email"
          />
          {errEmail ? <p className="error">{errEmail}</p> : null}
          <FormInput label="Password" name="password" type="password" />
          <FormInput
            id="sign-up-password"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          {errPassword ? <p className="error">{errPassword}</p> : null}
          <CustomButton
            type="submit"
            className="btn btn-lg btn-primary btn-block"
          >
            Sign Up
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
