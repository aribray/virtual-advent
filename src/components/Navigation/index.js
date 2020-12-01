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
      {/* <li> */}
        {/* <Button type="button" className="btn btn-info" href={ROUTES.PHOTOS}>Photo Gallery</Button> */}
      {/* </li> */}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
)

  const NavigationNonAuth = () => (
  <div>
    <ul className="nav nav-pills">
      <li>
        <Button type="button" className="btn btn-primary" href={ROUTES.LANDING}>Landing</Button>
      </li>
      <li>
        <Button type="button" className="btn btn-primary" href={ROUTES.SIGN_IN}>Sign In</Button>
      </li>
    </ul>
  <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>

  );

export default Navigation;


