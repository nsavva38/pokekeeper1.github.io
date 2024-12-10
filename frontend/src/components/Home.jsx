import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/NationalDex">NationalDex</Link></li>
          <li><Link to="/Register">Register</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Account">Account</Link></li>
        </ul>
      </nav>
      <h1>Welcome to PokeKeeper</h1>
    </div>
  );
};

export default Home;
