import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css';

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

  const handleDemo = (e) => {
    e.preventDefault();

    const email = 'demo@aa.io';
    const password = 'password';

    return dispatch(login(email, password))
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='auth-logo'>- Logo goes here -</div>
        <form className='login-form' onSubmit={onLogin}>
          <div className='login-form'>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              className='login-inputs'
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
          <div className='login-form'>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className='login-inputs'
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
          <button className='login-form login-submit' type='submit'>Login</button>
        </form>
        <div className='login-demo-container'>
          <button type="submit" id='demo-button' onClick={handleDemo}>Demo</button>
        </div>
      </div>
      <NavLink to='/sign-up' exact={true} className='below-login'>
        Sign Up
      </NavLink>
    </div>
  );
};

export default LoginForm;
