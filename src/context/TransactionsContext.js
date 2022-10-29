import { createContext, useEffect, useState } from 'react';
import React from 'react';

export const TransactionsContext = createContext();

export function TransactionsContextProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // console.log(transactions);

  if (!transactions) {
    return <strong>Loading transactions...</strong>;
  }

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
