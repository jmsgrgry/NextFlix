import React, { useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import './Menu/Menu.css';
import ReadMoviesDatabase from './ReadMoviesDatabase';

function RateMovies() {

    var [render, setRender] = React.useState(1);

    var popularMovies = ReadMoviesDatabase();

    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = popularMovies[index];

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