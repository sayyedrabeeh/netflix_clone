import React, { useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY',
      }
    })
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className='card-list'>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
