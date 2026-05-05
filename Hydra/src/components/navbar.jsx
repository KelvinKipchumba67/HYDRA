import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-logo" to="/">HYDRA</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/#problem-solution">How it works</Link></li>
          <li><a href="#sustainability">Ingredients</a></li>
        </ul>
        <div className="nav-actions">
            <Link className="nav-btn nav-btn--secondary" to="/login">Login</Link>
          <Link className="nav-btn nav-btn--primary" to="/shop">Shop Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;