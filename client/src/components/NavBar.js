import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="logo">SB</div>
          <div className="name">SBIT Bot</div>
        </Link>

        <nav className="nav-links" aria-label="Main">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/">Students</Link>
          <Link className="nav-link" to="/add">Add Student</Link>
          <Link className="nav-link" to="/register">Register</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <button className="nav-cta" onClick={logout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}