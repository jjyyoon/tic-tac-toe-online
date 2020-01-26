import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../src/pages/homepage/homepage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import RoomListPage from "./pages/room-list-page/room-list-page.component";
import GamePage from "../src/pages/game-page/game-page.component";
import Auth from "./components/auth/auth.component";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  setUser = (name, email) => {
    this.setState({ currentUser: { userName: name, userEmail: email } });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/signin"
            render={() => <SignInAndSignUpPage setUser={this.setUser} />}
          />
          <Auth>
            <Route
              path="/list"
              render={() => <RoomListPage currentUser={currentUser} />}
            />
            <Route
              path="/game"
              render={() => <GamePage currentUser={currentUser} />}
            />
          </Auth>
        </Switch>
      </div>
    );
  }
}

export default App;
