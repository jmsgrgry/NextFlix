import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';

function GetAllMovies() {

    console.log("got!");
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
                    movieRating: data.imdb_rating
                }])
            });
        });
    }, []);  

    return (
        popularMovies
    );
  } 

  export default GetAllMovies;