import React from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyA6M7L0B9zGoMGLWZ4mvx7_6elWbDrmKjM",
  authDomain: "nextflix-96831.firebaseapp.com",
  databaseURL: "https://nextflix-96831-default-rtdb.firebaseio.com",
  projectId: "nextflix-96831",
  storageBucket: "nextflix-96831.appspot.com",
  messagingSenderId: "442805077457",
  appId: "1:442805077457:web:c2a70c7ec6452fd5c10cf0",
})

const auth = firebase.auth();

function SignIn() {

    function signInWithGoogle() {

      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((result) => {

        var db = firebase.firestore();

        db.collection('users').doc(result.user.uid).set({}, {merge: true});

        var docRef = db.collection("users").doc(result.user.uid);
        var getData = docRef.get().then((doc) => {
            if (!doc.data().Profile?.picture) {
              const uploadImage = async () => {
                const imageRef = firebase.storage().ref(`/profile_pics/default-profile-picture.png`)
                const url = await imageRef.getDownloadURL().catch((error) => { throw error });
                db.collection('users').doc(result.user.uid).update({
                  "Profile.picture": url,
              })}
              uploadImage();
            }
        })

    })
    .catch((error) => alert(error));;
    }

    return !auth.currentUser && (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      </>
    )
  
  }

  export default SignIn;