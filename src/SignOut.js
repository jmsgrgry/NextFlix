import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const auth = firebase.auth();

function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

export default SignOut;