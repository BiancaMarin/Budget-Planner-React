import React, { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import TransactionItem from './TransactionItem';
import styles from './TransactionsList.module.css';

function TransactionsList() {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  // console.log(transactions);

  if (!transactions) {
    return <strong>Loading transactions...</strong>;
  }

  return (
    <section className={styles['transactions']}>
      <h2>Transaction Details</h2>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
}

export default TransactionsList;
