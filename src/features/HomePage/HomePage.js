import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function HomePage() {
  return (
    <section className={styles['landing-page']}>
      <Navbar />
      <main>
        <div className={styles['circle']}></div>
        <div className={styles['small-circle']}></div>
        <h1 className="title">
          BUDGET <span>{''}</span> PLANNER
        </h1>
        <h2>Plan your budget</h2>
        <p>
          Budget Planner tool to gain a better understanding of your money
          coming in and out, and how to improve your finances
        </p>
        <button className={styles['get-started']}>
          <a href="/register">
            {' '}
            Get started{' '}
            <FontAwesomeIcon
              icon={solid('arrow-right')}
              className={styles['arrow']}
            />{' '}
          </a>
        </button>
      </main>
    </section>
  );
}

export default HomePage;
