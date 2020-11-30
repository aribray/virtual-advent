import React from 'react';
import { Button } from 'react-bootstrap';

import { withFirebase } from './components/Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="button" className="btn btn-danger" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);