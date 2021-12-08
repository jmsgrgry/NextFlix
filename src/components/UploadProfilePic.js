import React, { useEffect } from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';
import SignOut from './SignOut';

function ProfilePic() {

    const [file, setFile] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [check, setCheck] = React.useState(null);

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeCheck(e) {
        setCheck(e.target.checked);
        if (check == null && document.getElementById("checkbox").checked) {
            setCheck(true)
            db.collection('users').doc(user_id).update({
                "Profile.child": "true",
            })
        } else if (check == null){
            setCheck(false)
            db.collection('users').doc(user_id).update({
                "Profile.child": "false",
            })
        } else if (!check){
            db.collection('users').doc(user_id).update({
                "Profile.child": "true",
            })
        } else if (check) {
            db.collection('users').doc(user_id).update({
                "Profile.child": "false",
            })
        }
    }

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    const [url, setURL] = React.useState(null);
    
    var docRef = db.collection("users").doc(user_id);

    docRef.get().then((doc) => {
        var html = "<div class='profile-preview'>"
        html += "<img src=" + doc.data().Profile?.picture + "/>"
        html += "</div>"
        document.getElementById("profile-preview").innerHTML = html;
        if (url == null) setURL(doc.data().Profile?.picture);
        if (doc.data().Profile?.name && name == null) {
            document.getElementById("name").value = doc.data().Profile?.name;
        }
        if (doc.data().Profile?.child == "true" && check == null) {
            document.getElementById("checkbox").checked = "checked";
        }
    })
    
    function handleUpload(e) {
        e.preventDefault();
        const ref = firebase.storage().ref(`profile_pics/${user_id}`);
        const uploadTask = ref?.put(file);
        console.log(ref.getDownloadURL())

        var uploadedImage = URL.createObjectURL(file);

        uploadTask?.on("state_changed", console.log, console.error, () => {
        ref
            .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    showCheck();
                    setURL(url)
            });
        });

        console.log(url)
        db.collection('users').doc(user_id).update({
            "Profile.picture": url,
        })
        .then(function(){
            setURL(url)
        });
    }

    function handleUploadName(e) {
        e.preventDefault();
        db.collection('users').doc(user_id).update({
            "Profile.name": name,
        })
        .then(
            showCheck()
        );
    }

    function showCheck(){
        var checkHtml = "<div class='check-wrapper'><svg id='animated' class='checkmark' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'><circle id='animated' class='checkmark__circle' cx='26' cy='26' r='25' fill='none' /><path id='animated' class='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' /></svg></div>"
        document.getElementById("show-check").innerHTML = checkHtml;
        setName("");

        setTimeout(() => {
         document.getElementById('animated').style.display = 'none';
       }, 3000);
     }

    SignOut();

    return (
        <div>
   
            <div  class='profile-info-wrapper'>
                <h3 id='MenuTitle'>General Information</h3>
                <form onSubmit={handleUploadName}>
                    <label for="name">Username:</label>
                    <input type="text" id="name" onChange={handleChangeName}></input>
                    <button class="button-24" disabled={!name || name.length >= 15}>Set</button>
                </form>
                <br/>
                <p>Child Account?</p>
                <input type="checkbox" id="checkbox" onChange={handleChangeCheck}></input>
            </div>
            <div  class='wrapper'>
                <h3 id='MenuTitle'>Profile Picture</h3>
                <form onSubmit={handleUpload}>
                    <input type="file" onChange={handleChange}></input>
                    <button class="button-24" disabled={!file}>Upload</button>
                </form>
                <div id = "profile-preview"></div>
                <div id = "show-check"></div>
            </div>
        </div>
    );
  }

export default ProfilePic;