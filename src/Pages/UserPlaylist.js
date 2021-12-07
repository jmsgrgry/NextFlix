import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { doc, getDoc } from "firebase/firestore";
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';
import CreatePlaylist from '../components/CreatePlaylist';

const UserPlaylist = () => {

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    var docRef = db.collection("users").doc(user_id);
    var playlist = [];
    
    var playRef = db.collection("users").doc(user_id, "Added_Playlist");
    playRef.get().then(doc => {
            if (doc && doc.exists) {
                console.log(doc.id, '=>', doc.data());
                let temp = doc.get('Added_Playlist');
                playlist = temp;
                // console.log(playlist);
            }
        })
        .catch(err => {
            console.log(err);
        });

    // var rootRef = firebase.database().ref();
    // var ref = rootRef.child("users", user_id, "Added_Playlist");
    // ref.once("value").then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         var key = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(childData); 
    //     });
    // });

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

        // playlist.map((item) =>
        //     html += "<h1 id='MenuTitle'>"+ item + "</h1>"
        //     for(var i = 0; i < doc.data().Added?.item?.length; i++) {
        //         html += "<img src=" + doc.data().Added?.item[i].moviePoster + "/>"
        //     }
        // )
        for(var j = 0; j < playlist.length; j++){
            html += "<h1 id='MenuTitle'>"+ playlist[j] + "</h1>"
            // for(var i = 0; i < doc.data().Added?.playlist[j]?.length; i++) {
            //     console.log("here");
            //     // html += "<img src=" + doc.data().Added?.playlist[i][j].moviePoster + "/>"
            // }s
        }
 
        html += "</div>"
        document.getElementById("playlist").innerHTML = html
        // console.log("Document data:", doc.data().Rated);
    }
    })

    return (
        <div id="Recommendations">
            <h1 id="MenuTitle">User Playlist</h1>
            <a class="nav-link" href="/CreatePlaylist"><button className="btn_add">Create Playlist</button></a>
            {/* <button class="btn_add" onClick={addPlaylist}> Create Playlist</button> */}
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
        </div>
    )
}

export default UserPlaylist