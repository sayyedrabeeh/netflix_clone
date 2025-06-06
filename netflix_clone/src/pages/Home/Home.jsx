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
  const [featuredContent, setFeaturedContent] = useState(null);
  const API_KEY = "35ae4b66";  

  useEffect(() => {
    
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=Avengers&type=movie`)
      .then(res => res.json())
      .then(data => {
        if (data.Search && data.Search.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.Search.length);
          setFeaturedContent(data.Search[randomIndex]);
        }
      })
      .catch(err => console.error("Error fetching featured content:", err));
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img 
          src={featuredContent ? 
            (featuredContent.Poster !== "N/A" ? featuredContent.Poster : hero_banner) : 
            hero_banner
          } 
          alt={featuredContent ? featuredContent.Title : "Hero Banner"} 
          className='banner-img' 
        />
        <div className="hero-caption">
          {featuredContent ? (
            <h1 className="featured-title">{featuredContent.Title}</h1>
          ) : (
            <img src={hero_title} alt="" className='caption-img' />
          )}
          <p>{featuredContent ? 
              `Released in ${featuredContent.Year}` : 
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
        
        <TitleCards title="Action Movies" searchQuery="action" />
        <TitleCards title="Comedy Movies" searchQuery="comedy" />
        <TitleCards title="Batman Movies" searchQuery="batman" />
        <TitleCards title="Drama Movies" searchQuery="Drama" />
        <TitleCards title="Avengers" searchQuery="Avengers" />
        <TitleCards title="Superman Movies" searchQuery="superman" />
       </div>
      <Footer />
    </div>
  );
}

export default Home;
