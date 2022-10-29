import React from 'react';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import styles from './Balance.module.css';

function Balance() {
  const { transactions } = useContext(TransactionsContext);

  //EXPENSE TRANSACTIONS//
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const expenseAmounts = expenseTransactions.map((transaction) =>
    Number(transaction.amount)
  );

  const totalExpenseAmounts = expenseAmounts.reduce(
    (acc, item) => (acc += item),
    0
  );

  //INCOME TRANSACTIONS//
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income'
  );

  const incomeAmounts = incomeTransactions.map((transaction) =>
    Number(transaction.amount)
  );

  const totalIncomeAmounts = incomeAmounts.reduce(
    (acc, item) => (acc += item),
    0
  );

  //BALANCE//
  const balance = totalIncomeAmounts - totalExpenseAmounts;
  console.log(balance);

  return (
    <>
      <section>
        <div className={styles['balance']}>
          {' '}
          <p>Balance</p>
          <output>${balance}</output>
        </div>
      </section>
      <section>
        <div className={styles['incomes']}>
          <p>Incomes</p>
          <output className={styles['positive']}>${totalIncomeAmounts}</output>
        </div>
      </section>
      <section>
        <div className={styles['expenses']}>
          <p>Expenses</p>
          <output className={styles['negative']}>
            -${totalExpenseAmounts}
          </output>
        </div>
      </section>
    </>
  );
}

export default Balance;
