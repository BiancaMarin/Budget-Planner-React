import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <>
      <nav className={styles['navbar']}>
        <div className={styles['logo']}>
          <a href="/">
            <img src="images/logo.png" alt="logo" />
          </a>
        </div>
        <ul className={styles['navbar-menu']}>
          <li>
            <a href="/register">Sign in</a>
          </li>
          <li>
            {' '}
            <a href="/login">Log in</a>{' '}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
