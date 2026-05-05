import React from 'react';
import heroImage from "../assets/images/pic1.jpg";
import "./Hero.css";


const Hero = () => {
  return (
    <section className="hero-container">
      <img
        src={heroImage}
        alt="Hydra Sparkling Water"
        className="hero-bg-image"
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          Hydration is More than water. <br />
          Meet <span>Hydra Sparkling</span>
        </h1>

        <a className="hero-btn" href="#problem-solution">
          <span>Read More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;