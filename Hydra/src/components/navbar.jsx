import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {user ? (
            <>
              <Link className="nav-btn nav-btn--secondary" to="/cart">Cart</Link>
              <button className="nav-btn nav-btn--secondary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link className="nav-btn nav-btn--secondary" to="/login">Login</Link>
          )}
          <Link className="nav-btn nav-btn--primary" to="/shop">Shop Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;