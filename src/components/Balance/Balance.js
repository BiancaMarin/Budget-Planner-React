import React from 'react';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import styles from './Balance.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Balance() {
  const { transactions } = useContext(TransactionsContext);

  //EXPENSE TRANSACTIONS//
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const expenseAmounts = expenseTransactions.map((transaction) =>
    Number(transaction.amount)
  );

  const totalExpenseAmounts = expenseAmounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  //INCOME TRANSACTIONS//
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income'
  );

  const incomeAmounts = incomeTransactions.map((transaction) =>
    Number(transaction.amount)
  );

  const totalIncomeAmounts = incomeAmounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  //BALANCE//
  const balance = (totalIncomeAmounts - totalExpenseAmounts).toFixed(2);
  console.log(balance);

  return (
    <>
      <section>
        <div className={styles['balance']}>
          {' '}
          <p>Current Balance</p>
          <output>
            <span>$</span>
            {balance}
          </output>
        </div>
      </section>
      <section className={styles['income-expense']}>
        <div className={styles['incomes']}>
          <p>
            Incomes{' '}
            <FontAwesomeIcon
              icon={solid('arrow-up')}
              className={styles['positive']}
            />{' '}
          </p>
          <output className={styles['positive']}>
            {' '}
            <span>$</span>
            {totalIncomeAmounts}
          </output>
        </div>
        <div className={styles['expenses']}>
          <p>
            Expenses{' '}
            <FontAwesomeIcon
              icon={solid('arrow-down')}
              className={styles['negative']}
            />
          </p>
          <output className={styles['negative']}>
            <span>$</span>
            {totalExpenseAmounts}
          </output>
        </div>
      </section>
    </>
  );
}

export default Balance;
