import React from "react";
import { withRouter } from "react-router-dom";

import { handleFetch } from "../../handle-fetch";

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./header.styles.scss";

const Header = ({ history, location }) => {
  let signedIn;

  if (
    location.pathname.startsWith("/list") ||
    location.pathname.startsWith("/game")
  ) {
    signedIn = true;
  } else {
    signedIn = false;
  }

  const handleClick = () => {
    handleFetch("/logout").then(() => {
      history.push("/");
    });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Tic-tac-toe
      </Navbar.Brand>
      <Nav>
        {signedIn ? (
          <Nav.Link as={Link} to="/list">
            ROOM LIST
          </Nav.Link>
        ) : null}
        <Nav.Link
          as={Link}
          to={signedIn ? "#" : "/signin"}
          onClick={signedIn ? handleClick : null}
        >
          {signedIn ? "SIGN OUT" : "SIGN IN"}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default withRouter(Header);
