import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/Cards/TitleCards.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Home = () => {
   
  const [muteTrailer, setMuteTrailer] = useState(true);
  
  
  const [featuredContent, setFeaturedContent] = useState(null);
  const API_KEY = "69fe7e7c2285737216fe772c489555ad";
  
  useEffect(() => {
     
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
           
          const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
          setFeaturedContent(data.results[randomIndex]);
        }
      })
      .catch(err => console.error("Error fetching featured content:", err));
  }, []);

  return (
    <div className='home'  >
      <Navbar />
      <div className="hero">
       
        <img 
          src={featuredContent ? 
            `https://image.tmdb.org/t/p/original${featuredContent.backdrop_path}` : 
            hero_banner
          } 
          alt="" 
          className='banner-img' 
        />
        <div className="hero-caption">
          {featuredContent ? (
            <h1 className="featured-title">{featuredContent.title || featuredContent.name}</h1>
          ) : (
            <img src={hero_title} alt="" className='caption-img' />
          )}
          <p>{featuredContent ? 
              featuredContent.overview : 
              "Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy."
          }</p>
          <div className="hero-btns">
            <button className='btn play-btn'>
              <img src={play_icon} alt="" />Play
            </button>
            <button className='btn info-btn'>
              <img src={info_icon} alt="" />More Info
            </button>
          </div>
          <div className="maturity-rating">
            <span>TV-MA</span>
          </div>
        </div>
      </div>
      
      <div className="browse-container">
        <TitleCards title={"Trending Now"} category={"trending/all/week"} />
        <TitleCards title={"Popular on Netflix"} category={"movie/popular"} />
        <TitleCards title={"Netflix Originals"} category={"tv/top_rated"} isLarge={true} />
        <TitleCards title={"Top Rated Movies"} category={"movie/top_rated"} />
        <TitleCards title={"Action Movies"} category={"discover/movie"} params={"with_genres=28"} />
        <TitleCards title={"Comedy Movies"} category={"discover/movie"} params={"with_genres=35"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;