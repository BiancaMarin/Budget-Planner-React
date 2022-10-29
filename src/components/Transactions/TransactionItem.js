import React from 'react';

function TransactionItem({ transaction }) {
  let signTransaction;

  if (transaction.type === 'expense') {
    signTransaction = '-';
  } else {
    signTransaction = '+';
  }
  return (
    <>
      <output>
        <p>{transaction.description}</p>
        <p>
          {signTransaction}${transaction.amount}
        </p>
      </output>
    </>
  );
}

export default TransactionItem;
