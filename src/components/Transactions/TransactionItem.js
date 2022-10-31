import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import { useAuthContext } from '../../features/Auth/AuthContext';
import './TransactionItem.css';

function TransactionItem({ transaction }) {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  const { accessToken } = useAuthContext();
  let signTransaction;

  if (transaction.type === 'expense') {
    signTransaction = '-';
  } else {
    signTransaction = '+';
  }

  async function handleDeleteTransaction() {
    fetch(`http://localhost:3005/api/transactions/${transaction.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setTransactions(transactions.filter((t) => t.id !== transaction.id));
  }

  return (
    <>
      <output className="card-transaction">
        <p className="description">
          <FontAwesomeIcon
            className="money"
            icon={solid('money-check-dollar')}
          />{' '}
          {transaction.description}
        </p>
        <p className={signTransaction === '-' ? 'negative' : 'positive'}>
          {signTransaction} <span>$</span>
          {transaction.amount}
        </p>
        <button onClick={handleDeleteTransaction}>
          <FontAwesomeIcon icon={solid('trash')} className="trash" />
        </button>
      </output>
    </>
  );
}

export default TransactionItem;
