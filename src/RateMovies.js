import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
<<<<<<< Updated upstream

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
=======
import 'firebase/firestore';
import './Menu/Menu.css';
import ReadMoviesDatabase from './ReadMoviesDatabase';
import { useState } from 'react'
import TinderCard from 'react-tinder-card'

function RateMovies() {

    var [render, setRender] = React.useState(1);

    var popularMovies = ReadMoviesDatabase();

    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = popularMovies[index];
    const ddb = [
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
        { name: '1' },
    ]

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;
    
    const characters = ddb
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

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
>>>>>>> Stashed changes
        });
    }, []);

<<<<<<< Updated upstream
    return (
        <div style={{backgroundImage: "linear-gradient(to right, red , lightgreen)"}}>
            <p>Rate Movies Here</p>
            <div> {popularMovies[30]?.movieTitle} </div>
            <img src = {`${popularMovies[30]?.moviePoster}`} />
=======
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
    if (lastDirection == 'left') {
        setLastDirection('top')
        dislikedMovie()
    }
    if (lastDirection == 'right') {
        setLastDirection('top')
        likedMovie()
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
            <br/>
            <br/>
            <div>
            <div className='cardContainer'>
                {characters.map((character) =>
                    <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                        <img class="rate-image card" src={`${movie?.moviePoster}`} />
                    </TinderCard>
                )}
                {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
            </div>
            
            </div>
>>>>>>> Stashed changes
        </div>
    )
  
  }

  export default RateMovies;