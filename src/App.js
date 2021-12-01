// import React, { useRef, useState } from 'react';
import React, {useState,useEffect} from 'react';
import './App.css';
import RateMovies from './RateMovies';
import Navbar from './Navbar/NavbarElements';
import SearchBar from './Menu/SearchBar';
// import PreLoader from './PreLoader';

import Menu from './Menu/Menu';
import ProfilePic from './Navbar/Profile/ProfilePic';
import UserPlaylist from './Menu/UserPlaylist';
import Recommendations from './Menu/Recommendations';
import './Menu/Menu.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import landingVideo from './assets/landing-video.mp4';
import landingImage from './assets/landing-page.png';

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Router>
    <div className="App">
      <Navbar />
      <header>
      </header>

      <section>
        <Switch>
          <Route exact path="/">
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
            {user ? <RateMovies /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/rate">
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
            {user ? <RateMovies /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/profile">
            {user ? <ProfilePic /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/playlists">
            {user ? <UserPlaylist /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
            <div id = "playlist"></div>
          </Route>
          <Route exact path="/recommendations">
            {user ? <Recommendations /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/SearchBar">
            {user ? <SearchBar /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
        </Switch>
      </section>

    </div>
    </Router>
  );
}

export default App;