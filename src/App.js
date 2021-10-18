import React, { useRef, useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RateMovies from './RateMovies';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/database'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import logo from './assets/NextFlix-logo.png';

firebase.initializeApp({
  apiKey: "AIzaSyA6M7L0B9zGoMGLWZ4mvx7_6elWbDrmKjM",
  authDomain: "nextflix-96831.firebaseapp.com",
  databaseURL: "https://nextflix-96831-default-rtdb.firebaseio.com",
  projectId: "nextflix-96831",
  storageBucket: "nextflix-96831.appspot.com",
  messagingSenderId: "442805077457",
  appId: "1:442805077457:web:c2a70c7ec6452fd5c10cf0"
})

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