import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import axios from '../axios';
import '../styles/Row.css';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState();
    
    useEffect(() => {
        async function fetchData(){
            var page = String(Math.floor(Math.random() * 10) + 1)
            fetchUrl = fetchUrl + (isLargeRow ? page : "");
            console.log(fetchUrl);
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay:1,
        },
    }

    const handleClick = (movie) => {
        movieTrailer(movie?.name || movie?.title || movie?.original_title)
        .then((url) => {
            console.log(url);
            const urlParams = new URLSearchParams(new URL(url).search);
            if(trailerUrl === urlParams.get('v')){
                setTrailerUrl('');    
            }else{
                setTrailerUrl(urlParams.get('v'));
            }
        })
        .catch((error) => console.log(error));
    }

    return(
        <div className='row'>
            <div style={{marginLeft:25}}>
                <h1>{title}</h1>
            </div>
            
            <div className='row_posters'>

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.poster_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;