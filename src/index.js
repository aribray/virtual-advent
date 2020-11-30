import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
import * as serviceWorker from "./serviceWorker";
import { CalendarStore, WishlistStore } from "./store";
// import AuthProvider from './providers/AuthProvider'
import {BrowserRouter} from 'react-router-dom'
import Background from "./layouts/Background";

import Firebase, { FirebaseContext } from './components/Firebase';

const calendarStore = new CalendarStore();
const wishlistStore = new WishlistStore();

ReactDOM.render((
  <FirebaseContext.Provider value={new Firebase()} >
    <Background />
    <App calendarStore={calendarStore}
          wishlistStore={wishlistStore} />
  </FirebaseContext.Provider>),
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();