import React, { useContext } from "react";
import { Router, Route } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { firebaseAuth } from './providers/AuthProvider';
import SignIn from './components/signInForm';


const history = createHistory();
function App({ calendarStore }) {

  const {handleSignIn} = useContext(firebaseAuth)
  console.log(handleSignIn)
  const { token } = useContext(firebaseAuth)
  console.log(token)

  return (
    <div>
        <Router history={history}>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Calendar App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route
            path="/"
            exact
            render={props => token === null ? <SignIn /> : <HomePage {...props} calendarStore={calendarStore} />}
            // component={props => (
            //   <HomePage {...props} calendarStore={calendarStore} />
            // )}
          />
        </Router>
    </div>
  );
}
export default App;


// import React from 'react'
// import { ThemeProvider } from '@material-ui/core/styles'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import theme from './theme'
// import {
//   Calendar,
//   DateLocalizer,
//   momentLocalizer,
//   globalizeLocalizer,
//   move,
//   Views,
//   Navigate,
//   components,
// } from 'react-big-calendar'
// import moment from 'moment'

// import events from './events'

// const localizer = momentLocalizer(moment)

// const App = () => (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <div>
//       <Calendar
//         localizer={localizer}
//         defaultDate={new Date(2020,12,1)}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//       />
//     </div>
//   </ThemeProvider>
// )
// export default App
