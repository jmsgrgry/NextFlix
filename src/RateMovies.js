import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';

function RateMovies() {

    const popularMoviesRef = firebase.database().ref("/popular_movies");
    const [popularMovies, setPopularMovies] = React.useState([]);

    useEffect(() => {
        
        popularMoviesRef.once("value", function(snapshot){

            snapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                var data = childSnapshot.val();

                setPopularMovies(currMovies => [...currMovies, { 
                    key: key, 
                    movieTitle: data.movie_title, 
                    moviePoster: data.movie_poster, 
                    movieYear: data.movie_year,
                    movieGenre: data.movie_genre, 
                    movieRating: data.movie_rating
                }])
            });
            console.log(popularMovies);
            console.log(popularMovies[0]?.moviePoster);
        });
    }, []);

    return (
        <div style={{backgroundImage: "linear-gradient(to right, red , lightgreen)"}}>
            <p>Rate Movies Here</p>
            <div> {popularMovies[30]?.movieTitle} </div>
            <img src = {`${popularMovies[30]?.moviePoster}`} />
        </div>
    )
  
  }

  export default RateMovies;