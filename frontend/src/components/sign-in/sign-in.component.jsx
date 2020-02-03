import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

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
          err: "*Invalid email or password, please try again"
        });
      }
    });
  };

  render() {
    const { err } = this.state;

    return (
      <div className="sign-in">
        <h3>I already have an account</h3>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label="Email Address" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          {err ? <p className="error">{err}</p> : null}
          <CustomButton
            type="submit"
            className="btn btn-lg btn-primary btn-block"
          >
            Sign In
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
