import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const Navigate = useNavigate();
  return (
    <section className='homepage'>

      <section className={styles.hero}>
        <h1>Welcome to PokéKeeper</h1>
        <p>Your ultimate Pokémon management tool</p>
        <p>Click the PokéBall to Get Started</p>
        <button onClick={() => Navigate(`/register`) }>Get Started</button>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Create Teams</h2>
          <p>Build and manage your own Pokémon teams with ease.</p>
        </div>
        <div className={styles.feature}>
          <h2>Explore the Dex</h2>
          <p>Search and learn about all your favorite Pokémon.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 PokéKeeper. All rights reserved.</p>
        <p><Link to="/contact">Contact Us</Link></p>
      </footer>
    </section>
  );
};

export default Home;
