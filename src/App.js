import React, { useRef, useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RateMovies from './RateMovies';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import logo from './assets/NextFlix-logo.png';

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <img src={logo} />
        <SignOut />
      </header>

      <section>
        {user ? <RateMovies /> : <SignIn />}
      </section>

    </div>
  );
}


export default App;