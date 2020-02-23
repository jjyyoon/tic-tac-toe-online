import React from "react";
import { withRouter } from "react-router-dom";

import { handleFetch } from "../../handle-fetch";

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./header.styles.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  checkSignedIn = () => {
    handleFetch("/header", null, 401).then(({ data }) => {
      if (data.username) {
        this.setState({ username: data.username });
      }
    });
  };

  componentDidMount() {
    this.checkSignedIn();
  }

  handleClick = () => {
    const { username } = this.state;

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    };

    handleFetch("/logout", settings).then(() => {
      this.props.history.push("/");
      this.setState({ username: null });
    });
  };

  render() {
    const { username } = this.state;
    if (!username) {
      this.checkSignedIn();
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Tic-tac-toe
        </Navbar.Brand>
        <Nav>
          {username ? (
            <Nav.Link as={Link} to="/list">
              ROOM LIST
            </Nav.Link>
          ) : null}
          <Nav.Link
            as={Link}
            to={username ? "#" : "/signin"}
            onClick={username ? this.handleClick : null}
          >
            {username ? "SIGN OUT" : "SIGN IN"}
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
