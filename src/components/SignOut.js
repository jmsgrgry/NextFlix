import React from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

function SignOut() {
  const auth = firebase.auth();
  var db = firebase.firestore();
  if (auth.currentUser){
    var user_id = auth.currentUser.uid;

    var docRef = db.collection("users").doc(user_id);

    docRef.get().then((doc) => {

      var html = "<div class='profile-navbar'>"
      html += "<img src=" + doc.data().Profile?.picture + "/>"
      html += "</div>"
      document.getElementById("profile-navbar").innerHTML = html;

      if (doc.data().Profile?.name && doc.data().Profile?.name != null) {
        var html = `<div class='name-navbar'>${doc.data().Profile?.name}</div>`
          document.getElementById("name-navbar").innerHTML = html;
    }

  })
  } 

  return auth.currentUser && (
    <div>
      <Link to="/"><button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button></Link>
      <div id = "name-navbar"></div>
      <div id = "profile-navbar"></div>
    </div>
  )
}

export default SignOut;