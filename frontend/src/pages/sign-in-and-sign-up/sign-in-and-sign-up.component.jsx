import React from "react";

import { Row } from "react-bootstrap";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = () => (
  <Row className="sign-in-page">
    <SignIn />
    <SignUp />
  </Row>
);

export default SignInAndSignUpPage;
