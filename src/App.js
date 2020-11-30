import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
// import { FirebaseContext } from './components/Firebase';
import SignInPage from './components/signInForm';
import Wishlist from './components/Wishlist';
import Navigation from './components/Navigation'
import * as ROUTES from './constants/routes';
import { AuthUserContext } from './components/Session';
import { withFirebase } from './components/Firebase';
import withAuthentication from "./components/Session/withAuthentication";
import { WishlistDataService } from "./requests";

const history = createHistory();
const App = ( {calendarStore, wishlistStore }) => (
  <Router history={history}>
    <div>
      <Navigation />

      <hr />
      <Route exact path={ROUTES.SIGN_IN} component={props=> <SignInPage {...props} />} />

      <Route exact path={ROUTES.CALENDAR} component={props => <HomePage {...props} calendarStore={calendarStore} />} />
      <Route exact path={ROUTES.WISHLIST} component={props => <Wishlist {...props} wishlistStore={wishlistStore} />} />
    </div>
  </Router>
)

export default withAuthentication(App);