import React, { useEffect } from 'react';
import '../../App.css';

import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import 'firebase/database';
import 'firebase/firestore';
import '../../Menu/Menu.css';
import { initializeApp } from "firebase/app";

const auth = firebase.auth();

function ProfilePic() {


    const [image , setImage] = React.useState('');

    const upload = ()=>{
    if (image == null) return;
        if (!firebase.storage) {
            console.log("stopped");
            return;
        }

        console.log(image);

        const ref = firebase.storage().ref(`images/${image.name}`);

        // const ref = firebase.storage.ref(`images/${image.name}`);
        ref.put(image).on("state_changed" , alert("success") , alert);
        
    }
  
  return (
    <div className="App">
      <h1>Welcome to User Page</h1>
      <h4 className="pf_text">Upload your profile picture</h4> 
      <br />
      <center>
      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={upload}>Upload</button>
      </center>
    </div>
  );
}

export default ProfilePic;