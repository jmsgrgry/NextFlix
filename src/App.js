import React, {useState,useEffect} from 'react';
import './styles/App.css';
import './styles/Pages.css';
import RateMovies from './Pages/RateMovies';
import Navbar from './Navbar/NavbarElements';
import SearchBar from './components/SearchBar';
import ProfilePic from './components/UploadProfilePic';
import UserPlaylist from './Pages/UserPlaylist';
import Recommendations from './Pages/Recommendations';
import CreatePlaylist from './components/CreatePlaylist';

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
            <div id = "profile-pic"></div>
          </Route>
          <Route exact path="/playlists">
            {user ? <UserPlaylist /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
            <div id = "playlist"></div>
          </Route>
          <Route exact path="/recommendations">
            {user ? <Recommendations /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/search">
            {user ? <SearchBar /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
          <Route exact path="/CreatePlaylist">
            {user ? <CreatePlaylist /> : <video autoPlay playsinline poster={landingImage} src={landingVideo}></video>}
          </Route>
        </Switch>
      </section>

    </div>
    </Router>
  );
}

export default App;