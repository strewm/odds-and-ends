import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const errors = {};

      data.forEach(error => {
        const errLabel = error.split(' : ')[0];
        const errMessage = error.split(' : ')[1];
        errors[errLabel] = errMessage;
      });

      setErrors(errors);
      return;
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const handleDemo = (e) => {
  //   e.preventDefault();

  //   const email = 'demo@aa.io';
  //   const password = 'password';

  //   return dispatch(login(email, password))
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <NavLink to='/login' exact={true}>
        Login
      </NavLink>
      <NavLink to='/sign-up' exact={true}>
        Sign Up
      </NavLink>
      <form onSubmit={onLogin}>
        {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="errors">
          {errors.email ? `${errors.email}` : ''}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="errors">
          {errors.password ? `${errors.password}` : ''}
        </div>
        <button type='submit'>Login</button>
      </form>
      {/* <div className='login-demo-container'>
        <button type="submit" id='login-demo-button' onClick={handleDemo}>DEMO USER</button>
      </div> */}
    </>
  );
};

export default LoginForm;
