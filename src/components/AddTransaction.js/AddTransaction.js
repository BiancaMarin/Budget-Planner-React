import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../features/Auth/AuthContext';
import styles from './AddTransaction.module.css';

function AddTransaction() {
  const { accessToken, user } = useAuthContext();
  const [values, setValues] = useState('');

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    fetch('http://localhost:3005/api/transactions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());
  }

  return (
    <section className={styles['add-transaction']}>
      <form
        action=""
        className={styles['form-transaction']}
        onSubmit={handleSubmit}
      >
        <h2>Add new transaction</h2>
        <select name="type" onChange={handleInputChange}>
          <option value="">Transaction type</option>
          <option name="expense" value="expense">
            Expense
          </option>
          <option name="income" value="income">
            Income
          </option>
        </select>
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Enter amount"
          name="amount"
          value={values.amount}
          onChange={handleInputChange}
        />
        <button type="submit">Add transaction</button>
      </form>
    </section>
  );
}

export default AddTransaction;
