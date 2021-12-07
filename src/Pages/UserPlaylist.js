import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';

const UserPlaylist = () => {

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    var docRef = db.collection("users").doc(user_id);

    var getData = docRef.get().then((doc) => {
    if (doc.exists) {

        var html = "<div class='wrapper'><h1 id='MenuTitle'>Liked Movies</h1>"
        for (var i = 0; i < doc.data().Rated?.liked?.length; i++) {
            html += "<img src=" + doc.data().Rated?.liked[i].moviePoster + "/>"
        }
        html += "<h1 id='MenuTitle'>Disliked Movies</h1>"
        for (var i = 0; i < doc.data().Rated?.disliked?.length; i++) {
            html += "<img src=" + doc.data().Rated?.disliked[i].moviePoster + "/>"
        }
        html += "<h1 id='MenuTitle'>Watch Later</h1>"
        for (var i = 0; i < doc.data().Added?.defaultPlaylist?.length; i++) {
            html += "<img src=" + doc.data().Added?.defaultPlaylist[i].moviePoster + "/>"
        }
        html += "</div>"
        document.getElementById("playlist").innerHTML = html
        // console.log("Document data:", doc.data().Rated);
    }
    })

    return (
        <div id="Recommendations">
            <h1 id="MenuTitle">User Playlists</h1>
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
        </div>
    )
}

export default UserPlaylist