import './Menu.css';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';

const auth = firebase.auth();

const SearchBar = () => {

    // // const [user] = useAuthState(auth);
    // // const auth = firebase.auth();
    // // var db = firebase.firestore();
    // // var user_id = auth.currentUser.uid;
    // // var docRef = db.collection("users").doc(user_id);

    // // var getData = docRef.get().then((doc) => {
    // // if (doc.exists) {
    // //     // var html = "<form class='form-inline my-2 my-lg-0' method='POST' action='SearchBar.js'>"
    // //     // html += "<input class='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />"
    // //     // html += "<button class='btn btn-outline-success my-2 my-sm-0' type='submit\'>Search</button>"
    // //     // html += "</form>"

    // //     var html = "<div class='wrapper'><h1 id='MenuTitle'>Liked Movies</h1>"
    // //     for (var i = 0; i < doc.data().Rated?.liked.length; i++) {
    // //         html += "<img src=" + doc.data().Rated?.liked[i].moviePoster + "/>"
    // //     }
    // //     html += "<h1 id='MenuTitle'>Disliked Movies</h1>"
    // //     for (var i = 0; i < doc.data().Rated?.disliked.length; i++) {
    // //         html += "<img src=" + doc.data().Rated?.disliked[i].moviePoster + "/>"
    // //     }
    // //     html += "<h1 id='MenuTitle'>Watch Later</h1>"
    // //     for (var i = 0; i < doc.data().Added?.defaultPlaylist.length; i++) {
    // //         html += "<img src=" + doc.data().Added?.defaultPlaylist[i].moviePoster + "/>"
    // //     }
    // //     html += "</div>"
    // //     document.getElementById("playlist").innerHTML = html
    // // }
    // // })

    // // autocomplete
    
    // // console.log(getData)

    // return (
    //     <div id="SearchWrap">
    //         <h1 id="searchTitle">Hello</h1>
    //         <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    //         <form class="form-inline my-2 my-lg-0" method="POST">
    //             <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    //             <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    //         </form> 
    //     </div>
    // );

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    var docRef = db.collection("users").doc(user_id);

    var getData = docRef.get().then((doc) => {
    if (doc.exists) {

        var html = "<div class='wrapper'><h1 id='MenuTitle'>Liked Movies</h1>"
        for (var i = 0; i < doc.data().Rated?.liked.length; i++) {
            html += "<img src=" + doc.data().Rated?.liked[i].moviePoster + "/>"
        }
        html += "<h1 id='MenuTitle'>Disliked Movies</h1>"
        for (var i = 0; i < doc.data().Rated?.disliked.length; i++) {
            html += "<img src=" + doc.data().Rated?.disliked[i].moviePoster + "/>"
        }
        html += "<h1 id='MenuTitle'>Watch Later</h1>"
        for (var i = 0; i < doc.data().Added?.defaultPlaylist.length; i++) {
            html += "<img src=" + doc.data().Added?.defaultPlaylist[i].moviePoster + "/>"
        }
        html += "</div>"
        document.getElementById("playlist").innerHTML = html
        // console.log("Document data:", doc.data().Rated);
    }
    })
    
    console.log(getData)

    return (
        <div id="SuggestedMovies">
            <h1 id="MenuTitle">User Playlist</h1>
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
        </div>
    )
};

export default SearchBar