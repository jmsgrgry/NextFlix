import React, { useEffect } from 'react';
import '../../App.css';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import 'firebase/database';
import 'firebase/firestore';
import '../../Menu/Menu.css';

const auth = firebase.auth();

function ProfilePic() {

    const [file, setFile] = React.useState(null);
    const [url, setURL] = React.useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        const ref = firebase.storage().ref(`images/${file.name}`);
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
    }

    return (
        <div>
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <button disabled={!file}>Set Profile Pic</button>
        </form>
        <br/>
        <img class="profile-image" src={url}/>
        </div>
    );
  }

export default ProfilePic;