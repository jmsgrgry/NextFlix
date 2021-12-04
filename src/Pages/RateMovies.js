import React, { useEffect } from 'react';
import '../styles/App.css';
// import '../styles/Pages.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import ReadMoviesDatabase from '../components/ReadMoviesDatabase';
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
    // if (lastDirection == 'left') {
    //     setLastDirection('up')
    //     dislikedMovie()
    // }
    // if (lastDirection == 'right') {
    //     setLastDirection('up')
    //     likedMovie()
    // }

    
    return (
        <div class="rate-background">

            <div className="rate-title"> {movie?.movieTitle} </div>
            <div className="rate-year"> {movie?.movieYear} </div>
            <br/>
            <button onClick={likedMovie}> Like</button>
            <button onClick={dislikedMovie}> Disike</button>
            <br/>
            <br/>
            <div className='cardContainer'>
                {characters.map((character) =>
                    <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                        <img class="rate-image card" src={`${movie?.moviePoster}`} />
                    </TinderCard>
                )}
                {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
            </div>
            {/* <img class="rate-image" src={`${movie?.moviePoster}`} /> */}
            
        </div>
    )
  
  } 

  export default RateMovies;