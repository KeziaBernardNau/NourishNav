import React from "react";
import "../../styles/hero.css";
import { Link } from "react-router-dom";
import nourishNav from "../../img/nourishNav.gif";

const HeroSection = () => {
    return (
        <div className="hero">
            <div></div>
            <div className="hero-background"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h5 className="banner-title">
                    Discover Healthier Living with NourishNav
                </h5>
                <p className="banner-text">Track Your Macros, Elevate Your Health!</p>
                <Link to="/signup" className="btn">
                    Sign Up
                </Link>
            </div>
            {/* container for nourishNav logo */}
            <div className="hero-gif">
                <img src={nourishNav} alt="nourishNav Logo" />
            </div>
        </div>
    );
};

export default HeroSection;
