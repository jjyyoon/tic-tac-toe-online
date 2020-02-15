import React from "react";
import { Link } from "react-router-dom";

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="home-page">
    <h1>Let's play!</h1>
    <Link to="/signin">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg"
        alt="Tic-tac-toe"
      />
    </Link>
  </div>
);

export default HomePage;
