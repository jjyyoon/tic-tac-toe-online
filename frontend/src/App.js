import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.component";
import HomePage from "../src/pages/homepage/homepage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import RoomListPage from "./pages/room-list-page/room-list-page.component";
import GamePage from "../src/pages/game-page/game-page.component";
import ErrorPage from "../src/pages/error-page/error-page.component";

import "./App.css";

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signin" component={SignInAndSignUpPage} />
      <Route path="/list" component={RoomListPage} />
      <Route path="/game" component={GamePage} />
      <Route path="/error" component={ErrorPage} />
    </Switch>
  </div>
);

export default App;
