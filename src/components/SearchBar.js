import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import 'firebase/firestore';
import '../styles/Pages.css';


function SearchBar(props) {

    const allMoviesRef = firebase.database().ref("/all_movies");
    const [allMovies, setAllMovies] = React.useState([]);
    var [render, setRender] = React.useState(1);

    useEffect(() => {
        
        allMoviesRef.once("value").then(function(snapshot){
            
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
                    // director: data.director,
                    // gross: data.gross,
                    imdbLink: data.imdb_link,
                    // metaScore: data.meta_score,
                    // numVotes: data.no_of_votes,
                    // overview: data.overview,
                    // runtime: data.Runtime,
                    // star1: data.star1,
                    // star2: data.star2,
                    // star3: data.star3,
                    // star4: data.star4,
                })
            });

            setAllMovies([...allMovies, ...newArray])
        });
    }, [render]);


    var index = Math.floor(Math.random() * (1000 + 1));
    var movie = allMovies[index];
    // console.log(movie);

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    useEffect(() => {
        if(value.length > 0){
            fetch('https://nextflix-96831-default-rtdb.firebaseio.com/all_movies.json').then(
                response => response.json()
            ).then(responseData => {
                setResult([]);
                let searchQuery = value.toLowerCase();
                for(const key in responseData){
                    let mov = responseData[key].movie_title.toLowerCase();
                    if(mov.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
                        setResult(prevResult => {
                            return [...prevResult, key]
                        })
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        }else{
            setResult([]);
        }
    }, [value])

    function searchItem(mov){
        var html = "<div class='suggested-option'>"
        html +=  "<img class='suggested-option-poster' src=" + allMovies[mov]?.moviePoster + "/>"
        html += "<div class='suggested-title'>" + allMovies[mov]?.movieTitle + "</div>"
        html += "<div className='desc'>" 
        html += "<div class='suggested-desc'> Year: " + allMovies[mov]?.movieYear + " </div>"
        html += "<div class='suggested-desc'> Genre: " + allMovies[mov]?.movieGenre + " </div>"
        html += "<div class='suggested-desc'> Rating: " + allMovies[mov]?.movieRating + " </div>"
        html += "<button class='btn_add' id='btn_mov'> Add to Playlist</button> </div></div>"
        document.getElementById("searchResult").innerHTML = html
        document.getElementById ("btn_mov").addEventListener ("click", addMovie(mov), false);

    }
    const auth = firebase.auth();
    var db = firebase.firestore();
    var user_id = auth.currentUser.uid;

    function addMovie(mov) {
        var movie = allMovies[mov]
        var genres = movie.movieGenre.split(',');
        console.log("here:", mov);

        db.collection('users').doc(user_id).update({
            "Added.defaultPlaylist": firebase.firestore.FieldValue.arrayUnion({
                key: movie.key, 
                movieTitle: movie.movieTitle, 
                moviePoster: movie.moviePoster, 
                movieYear: movie.movieYear,
                movieGenre: movie.movieGenre, 
                movieRating: movie.movieRating,
                imdbLink: movie.imdbLink,
             }),
             [`Added.genres.${genres}`]: firebase.firestore.FieldValue.increment(1),
        })
        .then(function(){
            setRender(render + 1);
        });
    }
    
    

    return (
        <div id="SearchWrap">
            <h1 id="searchTitle">Search for Movies</h1>
            <div className="searchbox">
                <div className="input-group">
                    <input type="text" className="searchBar" placeholder="Search" 
                    onChange={(event) => setValue(event.target.value)}
                    value={value} 
                    />
                    <div className="searchBack">
                        {result.map((result_key, index) => (
                            <a href="#" key ={index} onClick={() => searchItem(result_key)}>
                                <div className="searchEntry">
                                    {allMovies[result_key]?.movieTitle}
                                </div>
                            </a>
                        ))}
                    </div>
                    {/* <button type="button" class="btn btn-outline-primary">search</button> */}
                </div>
            </div>
            <div id="searchResult"></div>
        </div>
    
    );

}

export default SearchBar