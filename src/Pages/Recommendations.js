import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';

const Recommendations = () => {

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
    }, [0]);
    
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
                director: movie1.director,
                gross: movie1.gross,
                imdbLink: movie1.imdbLink,
                metaScore: movie1.metaScore,
                numVotes: movie1.numVotes,
                overview: movie1.overview,
                runtime: movie1.runtime,
                star1: movie1.star1,
                star2: movie1.star2,
                star3: movie1.star3,
                star4: movie1.star4,
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
                director: movie2.director,
                gross: movie2.gross,
                imdbLink: movie2.imdbLink,
                metaScore: movie2.metaScore,
                numVotes: movie2.numVotes,
                overview: movie2.overview,
                runtime: movie2.runtime,
                star1: movie2.star1,
                star2: movie2.star2,
                star3: movie2.star3,
                star4: movie2.star4,
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
                director: movie3.director,
                gross: movie3.gross,
                imdbLink: movie3.imdbLink,
                metaScore: movie3.metaScore,
                numVotes: movie3.numVotes,
                overview: movie3.overview,
                runtime: movie3.runtime,
                star1: movie3.star1,
                star2: movie3.star2,
                star3: movie3.star3,
                star4: movie3.star4,
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
                director: movie4.director,
                gross: movie4.gross,
                imdbLink: movie4.imdbLink,
                metaScore: movie4.metaScore,
                numVotes: movie4.numVotes,
                overview: movie4.overview,
                runtime: movie4.runtime,
                star1: movie4.star1,
                star2: movie4.star2,
                star3: movie4.star3,
                star4: movie4.star4,
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
        <div id="Recommendations">
            {/* <h1 id="MenuTitle">Suggested Movies</h1> */}
            {/* <Link to="/Menu"><button class="MenuButton" role="button">Menu</button></Link> */}
            
            <div class = "TopSuggested" style={{
                    backgroundImage: `url(${popularMovies[idxlist[4]]?.moviePoster})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>
                <img class="top-suggested-poster" src={popularMovies[idxlist[4]]?.moviePoster}/>
                <div class="top-suggested-filter"></div>
                <div class="top-sugested-title"> {popularMovies[idxlist[4]]?.movieTitle} </div>
                <div class="top-sugested-summary"> {popularMovies[idxlist[4]]?.overview} </div>
                <div class="top-sugested-genres"> {popularMovies[idxlist[4]]?.movieGenre} </div>
                <div class="top-sugested-stars"> Starring: {popularMovies[idxlist[4]]?.star1} ⦁ {popularMovies[idxlist[4]]?.star2} ⦁ {popularMovies[idxlist[4]]?.star3} </div>
                <div class="top-sugested-director"> Directed by {popularMovies[idxlist[4]]?.director} </div>
                <button class="MenuButton" onClick={addMovie4}> Add to Playlist</button>
            </div>
            
            <div class = "imageList">
                <div class="suggested-option">
                    <img class="suggested-option-poster" src={popularMovies[idxlist[0]]?.moviePoster} />
                    <div class="suggested-title"> {popularMovies[idxlist[0]]?.movieTitle} </div>
                    <div className="desc"> 
                        <div class="suggested-desc"> Summary: {popularMovies[idxlist[0]]?.overview} </div>
                        <div class="suggested-desc"> Director: {popularMovies[idxlist[0]]?.director} </div>
                        <div class="suggested-desc"> Year: {popularMovies[idxlist[0]]?.movieYear} </div>
                        <div class="suggested-desc"> Starring: {popularMovies[idxlist[0]]?.star1} ⦁ {popularMovies[idxlist[0]]?.star2} ⦁ {popularMovies[idxlist[0]]?.star3} </div>
                        <button class="btn_add" onClick={addMovie0}> Add to Playlist</button>
                    </div>
                </div>
                <div class="suggested-option">
                    <img class="suggested-option-poster" src={popularMovies[idxlist[1]]?.moviePoster}/>
                    <div class="suggested-title"> {popularMovies[idxlist[1]]?.movieTitle} </div>
                    <div className="desc"> 
                        <div class="suggested-desc"> Summary: {popularMovies[idxlist[1]]?.overview} </div>
                        <div class="suggested-desc"> Director: {popularMovies[idxlist[1]]?.director} </div>
                        <div class="suggested-desc"> Year: {popularMovies[idxlist[1]]?.movieYear} </div>
                        <div class="suggested-desc"> Starring: {popularMovies[idxlist[1]]?.star1} ⦁ {popularMovies[idxlist[1]]?.star2} ⦁ {popularMovies[idxlist[1]]?.star3} </div>
                        <button class="btn_add" onClick={addMovie1}> Add to Playlist</button>
                    </div>
                </div>
                <div class="suggested-option">
                    <img class="suggested-option-poster" src={popularMovies[idxlist[2]]?.moviePoster}/>
                    <div class="suggested-title"> {popularMovies[idxlist[2]]?.movieTitle} </div>
                    <div className="desc"> 
                        <div class="suggested-desc"> Summary: {popularMovies[idxlist[2]]?.overview} </div>
                        <div class="suggested-desc"> Director: {popularMovies[idxlist[2]]?.director} </div>
                        <div class="suggested-desc"> Year: {popularMovies[idxlist[2]]?.movieYear} </div>
                        <div class="suggested-desc"> Starring: {popularMovies[idxlist[2]]?.star1} ⦁ {popularMovies[idxlist[2]]?.star2} ⦁ {popularMovies[idxlist[2]]?.star3} </div>
                        <button class="btn_add" onClick={addMovie2}> Add to Playlist</button>
                    </div>
                </div>
                <div class="suggested-option">
                    <img class="suggested-option-poster" src={popularMovies[idxlist[3]]?.moviePoster}/>
                    <div class="suggested-title"> {popularMovies[idxlist[3]]?.movieTitle} </div>
                    <div className="desc"> 
                        <div class="suggested-desc"> Summary: {popularMovies[idxlist[3]]?.overview} </div>
                        <div class="suggested-desc"> Director: {popularMovies[idxlist[3]]?.director} </div>
                        <div class="suggested-desc"> Year: {popularMovies[idxlist[3]]?.movieYear} </div>
                        <div class="suggested-desc"> Starring: {popularMovies[idxlist[3]]?.star1} ⦁ {popularMovies[idxlist[3]]?.star2} ⦁ {popularMovies[idxlist[3]]?.star3} </div>
                        <button class="btn_add" onClick={addMovie3}> Add to Playlist</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Recommendations