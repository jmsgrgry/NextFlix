import './Menu.css';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';

const SuggestedMovies = () => {

    const popularMoviesRef = firebase.database().ref("/popular_movies");
    const [popularMovies, setPopularMovies] = React.useState([]);
    var [render, setRender] = React.useState(1);
    useEffect(() => {
        popularMoviesRef.once("value").then(function(snapshot){
            var newArray = []
            snapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                var data = childSnapshot.val();

                newArray.push({ 
                    key: key, 
                    movieTitle: data.movie_title, 
                    moviePoster: data.movie_poster, 
                    movieYear: data.movie_year,
                    movieGenre: data.movie_genre, 
                    movieRating: data.imdb_rating
                })
            });
            setPopularMovies([...popularMovies, ...newArray])
        });
    }, [render]);
    
    const idxlist = [];
    for (var i = 0; i < 10; i++) {
        idxlist.push(Math.floor(Math.random() * (1000 + 1)));
    }
    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = popularMovies[index];
    var movie1 = popularMovies[idxlist[1]];
    var movie2 = popularMovies[idxlist[2]];
    var movie3 = popularMovies[idxlist[3]];
    var movie4 = popularMovies[idxlist[4]];

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;

    function addMovie0() {

        var genres = movie.movieGenre.split(',');

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie.key, 
                movieTitle: movie.movieTitle, 
                moviePoster: movie.moviePoster, 
                movieYear: movie.movieYear,
                movieGenre: movie.movieGenre, 
                movieRating: movie.movieRating,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie = popularMovies[idxlist[0]];
    }
    function addMovie1() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie1.key, 
                movieTitle: movie1.movieTitle, 
                moviePoster: movie1.moviePoster, 
                movieYear: movie1.movieYear,
                movieGenre: movie1.movieGenre, 
                movieRating: movie1.movieRating,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie1 = popularMovies[idxlist[1]];
    }
    function addMovie2() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie2.key, 
                movieTitle: movie2.movieTitle, 
                moviePoster: movie2.moviePoster, 
                movieYear: movie2.movieYear,
                movieGenre: movie2.movieGenre, 
                movieRating: movie2.movieRating,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie2 = popularMovies[idxlist[2]];
    }
    function addMovie3() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie3.key, 
                movieTitle: movie3.movieTitle, 
                moviePoster: movie3.moviePoster, 
                movieYear: movie3.movieYear,
                movieGenre: movie3.movieGenre, 
                movieRating: movie3.movieRating,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie3 = popularMovies[idxlist[3]];
    }
    function addMovie4() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie4.key, 
                movieTitle: movie4.movieTitle, 
                moviePoster: movie4.moviePoster, 
                movieYear: movie4.movieYear,
                movieGenre: movie4.movieGenre, 
                movieRating: movie4.movieRating,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie4 = popularMovies[idxlist[4]];
    }

    return (
        <div id="SuggestedMovies">
            <h1 id="MenuTitle">Suggested Movies</h1>
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
            
            <div class = "TopSuggested">
                <img id="rotate" src={popularMovies[idxlist[4]]?.moviePoster} width="67.5%" height="100%" />
                <div class="desc"> {popularMovies[idxlist[4]]?.movieTitle} </div>
                <button class="btn_add" onClick={addMovie4}> Add to Playlist</button>
            </div>

            <div class = "imageList">
            <div class="playlistimg">
                <img src={popularMovies[idxlist[0]]?.moviePoster} width="67.5%" height="100%"/>
                <div className="desc"> {popularMovies[idxlist[0]]?.movieTitle} </div>
                <button class="btn_add" onClick={addMovie0}> Add to Playlist</button>
                {/* <button onClick={dislikedMovie}> Disike</button> */}
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[1]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[1]]?.movieTitle} </div>
                <button class="btn_add" onClick={addMovie1}> Add to Playlist</button>
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[2]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[2]]?.movieTitle} </div>
                <button class="btn_add" onClick={addMovie2}> Add to Playlist</button>
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[3]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[3]]?.movieTitle} </div>
                <button class="btn_add" onClick={addMovie3}> Add to Playlist</button>
            </div>
            </div>
            
        </div>
    )
}

export default SuggestedMovies