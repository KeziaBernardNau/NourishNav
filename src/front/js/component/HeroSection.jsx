import React from 'react';
import '../../styles/hero.css';

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className='banner-title'>Discover Healthier Living with NourishNav</h1>
        <p className='banner-text'>Track Your Macros, Elevate Your Health! </p>
        <a href="#about" className="btn">Learn More</a>
      </div>
    </div>
  );
};

export default HeroSection;


