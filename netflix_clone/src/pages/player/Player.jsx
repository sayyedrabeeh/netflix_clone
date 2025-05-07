import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=69fe7e7c2285737216fe772c489555ad`
        );
        const data = await response.json();
        const trailer = data.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setApiData(trailer || data.results?.[0]);
      } catch (err) {
        console.error('Failed to fetch trailer:', err);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow} alt="Back" onClick={() => navigate(-1)} />
      {apiData ? (
        <>
          <iframe
            width='90%'
            height='90%'
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name}
            frameBorder='0'
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10) || 'Unknown date'}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>Loading trailer...</p>
      )}
    </div>
  );
};

export default Player;
