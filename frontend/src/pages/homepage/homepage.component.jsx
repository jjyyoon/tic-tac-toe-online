import React from "react";
import { Link } from "react-router-dom";

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="home-page">
    <h1>tic, tac, toe</h1>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg"
      alt=""
    />
    <Link to="/signin">SIGN IN or SIGN UP</Link>
    <Link to="/game">Play Game</Link>
  </div>
);

export default HomePage;
