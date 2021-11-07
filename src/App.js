// import React, { useRef, useState } from 'react';
import React, {useRef, useState,useEffect} from 'react';
import './App.css';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RateMovies from './RateMovies';

//PPPPPPPPPPPPP
import Menu from './Menu/Menu';
import UserPlaylist from './Menu/UserPlaylist';
import SuggestedMovies from './Menu/SuggestedMovies';
import './Menu/Menu.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
//PPPPPPPPPPPPP


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
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 500));
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
      <header>
        <img src={logo} />
        <SignOut />
      </header>
      <section>
        <Switch>
          <Route exact path="/">
            <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link>
            {user ? <RateMovies /> : <SignIn />}
          </Route>
          <Route exact path="/Menu">
            {user ? <Menu /> : <SignIn />}
          </Route>
          <Route exact path="/UserPlaylist">
            {user ? <UserPlaylist /> : <SignIn />}
            <div id = "playlist"></div>
          </Route>
          <Route exact path="/SuggestedMovies">
            {user ? <SuggestedMovies /> : <SignIn />}
          </Route>
        </Switch>
      </section>

    </div>
    </Router>
  );
}

export default App;