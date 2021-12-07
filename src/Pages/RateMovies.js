import React, { useEffect, useRef } from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import ReadMoviesDatabase from '../components/ReadMoviesDatabase';
import { useState } from 'react'
import TinderCard from 'react-tinder-card'

function RateMovies() {

    var popularMovies = ReadMoviesDatabase();

    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = popularMovies[index];
    const ddb = [{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },
        { name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' },{ name: '1' }
    ]

    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;

    function likedMovie() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Rated.liked": firebase.firestore.FieldValue.arrayUnion({
                key: movie?.key, 
                movieTitle: movie?.movieTitle, 
                moviePoster: movie?.moviePoster, 
                movieYear: movie?.movieYear,
                movieGenre: movie?.movieGenre, 
                movieRating: movie?.movieRating,
                director: movie?.director,
                gross: movie?.gross,
                imdbLink: movie?.imdbLink,
                metaScore: movie?.metaScore,
                numVotes: movie?.numVotes,
                overview: movie?.overview,
                runtime: movie?.runtime,
                star1: movie?.star1,
                star2: movie?.star2,
                star3: movie?.star3,
                star4: movie?.star4,
             }),
             [`Rated.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            skipMovie();
        });
    }

    function dislikedMovie() {

        var genres = movie?.movieGenre?.split(',');

        db.collection('users').doc(user_id).update({
            "Rated.disliked": firebase.firestore.FieldValue.arrayUnion({
                key: movie?.key, 
                movieTitle: movie?.movieTitle, 
                moviePoster: movie?.moviePoster, 
                movieYear: movie?.movieYear,
                movieGenre: movie?.movieGenre, 
                movieRating: movie?.movieRating,
                director: movie?.director,
                gross: movie?.gross,
                imdbLink: movie?.imdbLink,
                metaScore: movie?.metaScore,
                numVotes: movie?.numVotes,
                overview: movie?.overview,
                runtime: movie?.runtime,
                star1: movie?.star1,
                star2: movie?.star2,
                star3: movie?.star3,
                star4: movie?.star4,
             }),
             [`Rated.genres.${genres}`]: firebase.firestore.FieldValue.increment(-1),
        })
        .then(function(){
            skipMovie();
        });
    }

    function skipMovie() {
        index = Math.floor(Math.random() * (1000 + 1));
        movie = popularMovies[index];
    }

    const characters = ddb
    const [lastDirection, setLastDirection] = useState()

    const inputLeft = React.useRef(null)
    const inputRight = React.useRef(null)

    const swiped = (direction, nameToDelete) => {
        
        if (direction == 'left') {
            inputLeft.current.click()
            document.getElementById('dislikedAlert').innerHTML = 'DISLIKED';
        } else if (direction == 'right') {
            inputRight.current.click()
            document.getElementById('likedAlert').innerHTML = 'LIKED';        
        } else if (direction == 'down') {
            skipMovie()
            document.getElementById('skippedAlert').innerHTML = 'SKIPPED';        
        }
    }

    const outOfFrame = (direction, name) => {
        document.getElementById('likedAlert').innerHTML = '';
        document.getElementById('dislikedAlert').innerHTML = '';
        document.getElementById('skippedAlert').innerHTML = '';  
        setLastDirection(direction)
        setLastDirection(0)
    }
      
    return (
        <div class="rate-background">

            <div className="rate-title"> {movie?.movieTitle} </div>
            <div className="rate-year"> {movie?.movieYear} </div>

            <br/>
            <button ref={inputRight} onClick={likedMovie} hidden> Like</button>
            <button ref={inputLeft} onClick={dislikedMovie} hidden> Disike</button>
            <img class="rate-image-shadow" src={`${movie?.moviePoster}`} />
            <div className='cardContainer'>
                {characters.map((character) =>
                    <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                        <img class="rate-image" src={`${movie?.moviePoster}`} />
                    </TinderCard>
                )}
            </div>
            <div>
                <h1 id="likedAlert" class="likedAlert"></h1>   
                <h1 id="dislikedAlert" class="dislikedAlert"></h1> 
                <h1 id="skippedAlert" class="skippedAlert"></h1> 
            </div>          
        </div>
    )
  
  } 

  export default RateMovies;