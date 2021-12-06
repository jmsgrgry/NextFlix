import React, {useRef, useState,useEffect} from 'react';

import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import '../styles/Pages.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';


const auth = firebase.auth();

const Navbar = () => {
  const [user] = useAuthState(auth);
  return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-danger font-weight-bold"><span className="h2">N</span>extFlix</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? 
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/rate">Rate Movies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/recommendations">Recommendations</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/playlists">Playlists</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile">User Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/SearchBar">Search</a>
              </li>
            </ul>
          : <SignIn /> }
          
          <SignOut />

        </div>
    </nav>
  );
};

export default Navbar;