import React, { useEffect } from 'react';
import '../styles/App.css';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';

function ReadMoviesDatabase() {

    const popularMoviesRef = firebase.database().ref("/popular_movies");
    const [popularMovies, setPopularMovies] = React.useState([]);

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

            setPopularMovies([...newArray])
        });
    }, [0]);
    
    return popularMovies;
  
  } 

  export default ReadMoviesDatabase;