// import React from 'react';
import React, {useRef, useState,useEffect} from 'react';

import SignIn from '../SignIn';
import SignOut from '../SignOut';
import RateMovies from '../RateMovies';
import Menu from '../Menu/Menu';
import UserPlaylist from '../Menu/UserPlaylist';
import SuggestedMovies from '../Menu/SuggestedMovies';
import SearchBar from '../Menu/SearchBar';
import '../Menu/Menu.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth();

const Navbar = () => {
  const [user] = useAuthState(auth);
  return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-danger font-weight-bold" href=""><span className="h2">N</span>extFlex</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? 
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Menu">User Page</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">User Profile</a>
                  <a class="dropdown-item" href="/UserPlaylist">User Playlist</a>
                  <a class="dropdown-item" href="/SuggestedMovies">Recommendations</a>
                  <a class="dropdown-item" href="/">Rate Movies</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Settings</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="/SearchBar">Search</a>


                  {/* <div class="input-group mt-2 mx-2">
                    <div class="form-outline">
                      <input type="search" id="form1" class="form-control-dropdown" />
                      <label class="form-label" for="form1">Search</label>
                    </div>
                  </div> */}
                </div>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li> */}
            </ul>
          : <SignIn /> }


          {/* <form class="form-inline my-2 my-lg-0" method="POST" action="SearchBar.js">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}

          <SignOut />

        </div>
    </nav>
  );
};

export default Navbar;