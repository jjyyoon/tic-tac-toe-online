import React from "react";
import { withRouter } from "react-router";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = this.state;

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password })
    })
      .then(() => {
        this.props.history.push("/list");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="sign-up">
        <h3>I don't have an account</h3>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="User Name"
            name="userName"
            type="text"
            onChange={this.handleChange}
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            onChange={this.handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={this.handleChange}
          />
          <CustomButton className="btn btn-lg btn-primary btn-block">
            Sign Up
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
