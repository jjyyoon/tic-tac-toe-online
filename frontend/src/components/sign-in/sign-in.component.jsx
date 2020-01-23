import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  render() {
    return (
      <div className="sign-in">
        <h3>I already have an account</h3>
        <span>Sign in with your email and password</span>

        <form action="" onSubmit={this.handleSubmit}>
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
          <CustomButton className="btn btn-lg btn-primary btn-block">
            Sign In
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
