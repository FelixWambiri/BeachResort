import React from 'react';

import { withFirebase } from '../../Authentication/firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" className="btn-primary logout" onClick={firebase.doSignOut}>
    Log Out
  </button>
);

export default withFirebase(SignOutButton);