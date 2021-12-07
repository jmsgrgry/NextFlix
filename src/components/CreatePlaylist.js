import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';
import { Link } from 'react-router-dom';
import { collection, setDoc } from 'firebase/firestore'; 

const CreatePlaylist = () => {
    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    let textInput = React.createRef(); 

    let onOnclickHandler = (e) => {
        console.log(textInput.current.value); 
        var temp = textInput.current.value

        db.collection('users').doc(user_id, "Added").update({
            "Added_Playlist": firebase.firestore.FieldValue.arrayUnion(textInput.current.value)
        })
    };
    

    return(
        <div className="playDiv">
            <div className="playTitle">Create New Playlist: </div>
            <input ref={textInput} type="text" placeholder="Playlist Title" />
            <button onClick={onOnclickHandler}>Create</button>
            <Link to="/Playlists"><button className="sign-out">Back to Playlist</button></Link>
        </div>
    )
}

export default CreatePlaylist