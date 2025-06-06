import React, { useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, searchQuery }) => {
  const [apiData, setApiData] = useState([]);
  const API_KEY = "35ae4b66";  

  useEffect(() => {
    if (!searchQuery) return;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&type=movie`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.Search) {
          setApiData(data.Search);
        } else {
          setApiData([]);
          console.error("No results found or error:", data.Error);
        }
      })
      .catch(err => console.error(err));
  }, [searchQuery]);

  return (
    <div className='title-cards'>
      <h2>{title || "Movies"}</h2>
      <div className='card-list'>
        {apiData.length > 0 ? (
          apiData.map((movie, index) => (
            <Link to={`/player/${movie.imdbID}`} className='card' key={index}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x170?text=No+Image"}
                alt={movie.Title}
              />
              <p>{movie.Title}</p>
            </Link>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
