import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <div className="home-hero card">
        <img src="/sbit.jpg" alt="SBIT" className="hero-img" />
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to SBIT Bot</h1>
          
          <Link to="/" className="btn btn-primary">View Students</Link>
        </div>
      </div>
    </div>
  );
}