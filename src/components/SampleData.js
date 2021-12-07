import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { doc, getDoc } from "firebase/firestore";
import 'firebase/database';
import 'firebase/firestore';

function SampleData() {
    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;

    var playlist = [];
    var playRef = db.collection("users").doc(user_id, "Added_Playlist");
    playRef.get().then(doc => {
        if (doc && doc.exists) {
            // console.log(doc.id, '=>', doc.data());
            let temp = doc.get('Added_Playlist');
            playlist = temp;
            // console.log(playlist);
        }
    })
    .catch(err => {
        console.log(err);
    });
    
    return playlist;
};

export default SampleData;
