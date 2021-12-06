import React from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Link } from 'react-router-dom';

const auth = firebase.auth();

function SignOut() {
    return auth.currentUser && (
      <Link to="/"><button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button></Link>
    )
  }

export default SignOut;