import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../src/pages/homepage/homepage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import GamePage from "../src/pages/game-page/game-page.component";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
          <Route path="/game" component={GamePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
