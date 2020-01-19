import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.styles.scss";

const SignUp = () => (
  <div className="sign-up">
    <h3>I don't have an account</h3>
    <span>Sign up with your email and password</span>

    <form action="">
      <FormInput label="Email Address" type="email" />
      <FormInput label="Password" type="password" />
      <CustomButton className="btn btn-lg btn-primary btn-block">
        Sign Up
      </CustomButton>
    </form>
  </div>
);

export default SignUp;
