import React from "react";
import { withRouter } from "react-router";

const Auth = ({ history, children }) => {
  fetch("/auth").then(res => {
    if (res.status === 401) {
      history.push("/signin");
    }
  });

  return <div> {children} </div>;
};

export default withRouter(Auth);
