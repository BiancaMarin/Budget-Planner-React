import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Balance from '../../components/Balance/Balance';
import AddTransaction from '../../components/AddTransaction.js/AddTransaction';
import TransactionsList from '../../components/Transactions/TransactionsList';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className={styles['dashboard']}>
        <section className={styles['info-panel']}>
          <h1>My budget</h1>
          <div>
            <Balance />
          </div>
          <div>
            <AddTransaction />
          </div>
        </section>
        <section className={styles['transactions-panel']}>
          <TransactionsList />
        </section>
      </div>
    </>
  );
}

export default Dashboard;
