import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <nav className={styles['navbar']}>
        <div className={styles['logo']}>
          <a href="/">
            <img src="images/logo.png" alt="logo" />
          </a>
        </div>
        <ul className={styles['navbar-menu']}>
          {user && (
            <>
              <li>Welcome, {user.firstName}</li>
              <li>
                {' '}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </a>{' '}
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <a href="/register">Sign in</a>
              </li>
              <li>
                {' '}
                <a href="/login">Log in</a>{' '}
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
