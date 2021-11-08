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

    return (
        <div id="SuggestedMovies">
            <h1 id="MenuTitle">Suggested Movies</h1>
            <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link>
            
            <div class = "TopSuggested">
                <img id="rotate" src={popularMovies[idxlist[4]]?.moviePoster} width="67.5%" height="100%" />
                <div class="desc"> {popularMovies[idxlist[4]]?.movieTitle} </div>
            </div>

            <div class = "imageList">
            <div class="playlistimg">
                <img src={popularMovies[idxlist[0]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[0]]?.movieTitle} </div>
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[1]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[1]]?.movieTitle} </div>
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[2]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[2]]?.movieTitle} </div>
            </div>
            <div class="playlistimg">
                <img src={popularMovies[idxlist[3]]?.moviePoster} width="67.5%" height="100%"/>
                <div class="desc"> {popularMovies[idxlist[3]]?.movieTitle} </div>
            </div>
            </div>
            
        </div>
    )
}

export default SuggestedMovies