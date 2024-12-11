import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>PokéKeeper</h1>
  
      </header>

      <section className={styles.hero}>
        <h1>Welcome to PokéKeeper</h1>
        <p>Your ultimate Pokémon management tool</p>
        <button onClick={() => alert('Get Started!')}>Get Started</button>
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
        <div className={styles.feature}>
          <h2>Track Progress</h2>
          <p>Keep track of your Pokémon battles and achievements.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 PokéKeeper. All rights reserved.</p>
        <p><Link to="/contact">Contact Us</Link></p>
      </footer>
    </>
  );
};

export default Home;
