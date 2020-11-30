import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import './index.module.css';
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session';
import SignOutButton from '../../signOut';
import { Button } from 'react-bootstrap';

const Navigation = ( {calendarStore, wishlistStore } ) => {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <NavigationAuth calendarStore={calendarStore} wishlistStore={wishlistStore} /> : <NavigationNonAuth />}
            </AuthUserContext.Consumer>
        </div>
    )

}

const NavigationAuth = () => (
  <div className="navbar auth">
    <ul className="nav">
      <li>
        <Button type="button" className="btn btn-primary" href={ROUTES.LANDING}>Home</Button>
      </li>
      <li>
        <Button type="button" className="btn btn-info" href={ROUTES.CALENDAR}>Calendar</Button>
      </li>
      <li>
        <Button type="button" className="btn btn-info" href={ROUTES.WISHLIST}>Wish List</Button>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
)

  const NavigationNonAuth = () => (
    <ul className="nav nav-pills">
      <li>
        <Button type="button" className="btn btn-primary" href={ROUTES.LANDING}>Landing</Button>
      </li>
      <li>
        <Button type="button" className="btn btn-primary" href={ROUTES.SIGN_IN}>Sign In</Button>
      </li>
    </ul>
  );

// const NavigationAuth = ( {calendarStore, wishlistStore } ) => (
//   <div>
//     <Navbar bg="primary" expand="lg" variant="dark">
//         <Navbar.Brand href="#home">A Very Virtual Christmas</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//             <Nav.Button href={ROUTES.LANDING}>Home</Nav.Button>
//             <Nav.Button href={ROUTES.WISHLIST}>Wishlist</Nav.Button>
//             <Nav.Button href={ROUTES.CALENDAR}>Calendar</Nav.Button>
//         </Nav>
//         </Navbar.Collapse>
//         </Navbar>
//         <Route
//         path={ROUTES.CALENDAR}
//         component={ props => <HomePage {...props} calendarStore={calendarStore} />}
//         // render={props => <HomePage {...props} calendarStore={calendarStore} />}
//         />
//         <Route
//         path={ROUTES.WISHLIST}
//         component={props => <Wishlist {...props} wishlistStore={wishlistStore} />}
//         // render={(props) => (
//         // <Wishlist {...props} wishlistStore={wishlistStore} />
//         // )}
//     />
//   </div>
// );

// const NavigationNonAuth = () => (
//         <div>
//     <Navbar bg="primary" expand="lg" variant="dark">
//         <Navbar.Brand href="#home">A Very Virtual Christmas</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//             <Nav.Button href={ROUTES.LANDING}>Home</Nav.Button>
//             <Nav.Button href={ROUTES.SIGN_IN}>Sign In</Nav.Button>
//         </Nav>
//         </Navbar.Collapse>
//         </Navbar>
//         <Route
//         path={ROUTES.SIGN_IN}
//         exact
//         render={props => <SignInPage {...props} />}
//         />
//   </div>
// )

export default Navigation;


