import React, { useEffect } from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';

function ProfilePic() {

    const [file, setFile] = React.useState(null);
    const [url, setURL] = React.useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    
    function handleUpload(e) {
        e.preventDefault();
        const ref = firebase.storage().ref(`profile_pics/${user_id}`);
        const uploadTask = ref?.put(file);

        var uploadedImage = URL.createObjectURL(file);
        console.log(uploadedImage);

        uploadTask?.on("state_changed", console.log, console.error, () => {
        ref
            .getDownloadURL()
            .then((url) => {
            setFile(null);
            setURL(url);
            });
        });

        db.collection('users').doc(user_id).update({
            "Profile.picture": url,
        })
        .then(function(){
        });
    }

    var docRef = db.collection("users").doc(user_id);

    var getData = docRef.get().then((doc) => {
        if (doc.exists) {
            var html = "<div class='wrapper'><h1 id='MenuTitle'>Liked Movies</h1>"
            html += "<img src=" + doc.data().Profile?.picture + "/>"
            html += "</div>"
            document.getElementById("profile-pic").innerHTML = html
        }
    })
    

    return (
        <div>
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <button disabled={!file}>Set Profile Pic</button>
        </form>
        <br/>
        </div>
    );
  }

export default ProfilePic;