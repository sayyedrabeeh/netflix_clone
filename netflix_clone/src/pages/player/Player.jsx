import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const OMDB_API_KEY = '35ae4b66';   
const YOUTUBE_API_KEY = 'AIzaSyB4AdK1r-WEfrOHGR1YZ5DDB0U1U6ewlGM';  

const Player = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
 
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
        const data = await res.json();
        setMovieData(data);

        if (data.Title) {
           
          fetchYouTubeTrailer(data.Title, data.Year);
        }
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    const fetchYouTubeTrailer = async (title, year) => {
      try {
        
        const query = encodeURIComponent(`${title} ${year} trailer`);
        const youtubeRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`);
        const youtubeData = await youtubeRes.json();
        const videoId = youtubeData.items?.[0]?.id?.videoId;
        setTrailerKey(videoId || null);
      } catch (error) {
        console.error('Failed to fetch YouTube trailer:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow} alt="Back" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
      
      {movieData ? (
        <>
          <h2>{movieData.Title} ({movieData.Year})</h2>
          <p>{movieData.Plot}</p>

          {trailerKey ? (
            <iframe
              width="90%"
              height="500px"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movieData.Title} Trailer`}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <p>Trailer not found.</p>
          )}

          <div className="player-info">
            <p>Released: {movieData.Released}</p>
            <p>Genre: {movieData.Genre}</p>
            <p>IMDB Rating: {movieData.imdbRating}</p>
          </div>
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default Player;
