import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword));

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

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <div className='auth-logo'>- Logo goes here -</div>
        <form className='signup-form' onSubmit={onSignUp}>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="errors">
            {errors.username ? `${errors.username}` : ''}
          </div>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="errors">
            {errors.email ? `${errors.email}` : ''}
          </div>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className="errors">
            {errors.password ? `${errors.password}` : ''}
          </div>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="errors">
            {errors.password ? `${errors.password}` : ''}
          </div>
          <button className='signup-form signup-submit' type='submit'>Sign Up</button>
        </form>
      </div>
      <div className='below-signup'>
        <div>Have an account?</div>
        <NavLink to='/login' exact={true}>Login</NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
