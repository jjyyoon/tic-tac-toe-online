import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

const SignIn = () => (
  <div className="sign-in">
    <h3>I already have an account</h3>
    <span>Sign in with your email and password</span>

    <form action="">
      <FormInput label="Email Address" type="email" />
      <FormInput label="Password" type="password" />
      <CustomButton>Sign In</CustomButton>
    </form>
  </div>
);

export default SignIn;
