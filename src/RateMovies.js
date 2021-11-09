import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Menu/Menu.css';
import Menu from './Menu/Menu';

function RateMovies() {

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
                    movieRating: data.imdb_rating,
                    director: data.director,
                    gross: data.gross,
                    imdbLink: data.imdb_link,
                    metaScore: data.meta_score,
                    numVotes: data.no_of_votes,
                    overview: data.overview,
                    runtime: data.Runtime,
                    star1: data.star1,
                    star2: data.star2,
                    star3: data.star3,
                    star4: data.star4,
                })
            });

            setPopularMovies([...popularMovies, ...newArray])
        });
    }, [render]);


    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = popularMovies[index];
    console.log(movie);

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;

    function likedMovie() {

        var genres = movie.movieGenre.split(',');

        db.collection('users').doc(user_id).update({
            "Rated.liked": firebase.firestore.FieldValue.arrayUnion({
                key: movie.key, 
                movieTitle: movie.movieTitle, 
                moviePoster: movie.moviePoster, 
                movieYear: movie.movieYear,
                movieGenre: movie.movieGenre, 
                movieRating: movie.movieRating,
                director: movie.director,
                gross: movie.gross,
                imdbLink: movie.imdbLink,
                metaScore: movie.metaScore,
                numVotes: movie.numVotes,
                overview: movie.overview,
                runtime: movie.runtime,
                star1: movie.star1,
                star2: movie.star2,
                star3: movie.star3,
                star4: movie.star4,
             }),
             [`Rated.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie = popularMovies[index];
    }

    function dislikedMovie() {

        var genres = movie.movieGenre.split(',');

        db.collection('users').doc(user_id).update({
            "Rated.disliked": firebase.firestore.FieldValue.arrayUnion({
                key: movie.key, 
                movieTitle: movie.movieTitle, 
                moviePoster: movie.moviePoster, 
                movieYear: movie.movieYear,
                movieGenre: movie.movieGenre, 
                movieRating: movie.movieRating,
             }),
             [`Rated.genres.${genres}`]: firebase.firestore.FieldValue.increment(-1),
        })
        .then(function(){
            setRender(render + 1);
        });

        index = Math.floor(Math.random() * (1000 + 1));
        movie = popularMovies[index];
    }

    
    return (
        <div class="rate-background">

            <div className="rate-title"> {movie?.movieTitle} </div>
            <div className="rate-year"> {movie?.movieYear} </div>
            <br/>
            <button onClick={likedMovie}> Like</button>
            <button onClick={dislikedMovie}> Disike</button>
            <br/>
            <br/>
            <img class="rate-image" src={`${movie?.moviePoster}`} />
            
        </div>
    )
  
  } 

  export default RateMovies;