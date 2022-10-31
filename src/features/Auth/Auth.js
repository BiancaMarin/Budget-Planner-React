import React from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import styles from './Auth.module.css';
import Navbar from '../../components/Navbar/Navbar';

function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
  });

  const [upperCaseError, setUpperCaseError] = useState({
    password: '',
  });
  const [lowerCaseError, setLowerCaseError] = useState({
    password: '',
  });

  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  const { login, accessToken } = useAuthContext();
  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
    setUpperCaseError({ ...upperCaseError, [e.target.name]: '' });
    setLowerCaseError({ ...lowerCaseError, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = ValidateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setUpperCaseError(validation.upperCaseError);
      setLowerCaseError(validation.lowerCaseError);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    let apiPath = 'register';
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = 'login';
    }

    const data = await fetch(`http://localhost:3005/api/${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    login(data);
  }

  return (
    <>
      <section className={styles['auth-section']}>
        <Navbar />
        <div className={styles['form-bgc']}>
          <form action="" className={styles['form']} onSubmit={handleSubmit}>
            <h2>{isRegister ? 'Sign In' : 'Log In'}</h2>
            <p>
              {isRegister
                ? 'Please enter your details to sign in'
                : 'Please enter your details to log in'}
            </p>
            {isRegister && (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  placeholder="FirstName"
                />
                {errors.firstName && (
                  <p className={styles['error']}>{errors.firstName}</p>
                )}
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  placeholder="LastName"
                />
                {errors.lastName && (
                  <p className={styles['error']}>{errors.lastName}</p>
                )}
              </>
            )}

            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && <p className={styles['error']}>{errors.email}</p>}
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {errors.password && (
              <p className={styles['error']}>{errors.password}</p>
            )}
            {upperCaseError.password && (
              <p className={styles['error']}>{upperCaseError.password}</p>
            )}
            {lowerCaseError.password && (
              <p className={styles['error']}>{lowerCaseError.password}</p>
            )}

            {isRegister && (
              <>
                <input
                  type="password"
                  name="retype_password"
                  value={values.retype_password}
                  onChange={handleInputChange}
                  placeholder="Retype password"
                />
                {errors.retype_password && (
                  <p className={styles['error']}>{errors.retype_password}</p>
                )}
              </>
            )}

            <button type="submit">{isRegister ? 'Sign In' : 'Log In'}</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Auth;

function ValidateForm(values, isRegister) {
  const validation = {
    errors: {
      email: '',
      password: '',
      retype_password: '',
      firstName: '',
      lastName: '',
    },
    upperCaseError: {
      password: '',
    },
    lowerCaseError: {
      password: '',
    },
    isValid: true,
  };

  if (isRegister) {
    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'Please enter your first name.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = 'Please enter your last name.';
    }

    const upperCase = new RegExp('(?=.[A-Z])');
    const lowerCase = new RegExp('(?=.*[a-z])');

    if (!upperCase.test(values.password)) {
      validation.isValid = false;
      validation.upperCaseError.password =
        'The password must contain at least one upper case.';
    }

    if (!lowerCase.test(values.password)) {
      validation.isValid = false;
      validation.lowerCaseError.password =
        'The password must contain at least one lower case.';
    }

    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'The two passwords do not match.';
    }
  }

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid e-mail address.';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      'Please enter a password that is at least 6 characters long.';
  }

  return validation;
}
