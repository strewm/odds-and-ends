import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import textLogo from '../../Images/text-logo.png';
import './SignUpForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }
    formData.append("password", password);
    formData.append("confirm_password", repeatPassword);

    const data = await dispatch(signUp(formData));

    if (data) {
      const errors = {};
      data.forEach(error => {
        const errLabel = error.split(' : ')[0];
        const errMessage = error.split(' : ')[1];
        errors[errLabel] = errMessage;
      });

      setErrors(errors);
      return;
    };
};

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfilePicture = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
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
      <img id='nav-logo' src={textLogo} alt='text logo' />
      <div className='signup-container'>
        <form className='signup-form' onSubmit={onSignUp}>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='text'
              name='username'
              placeholder='Username *'
              onChange={updateUsername}
              value={username}
              required={true}
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
              placeholder='Email *'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div className="errors">
            {errors.email ? `${errors.email}` : ''}
          </div>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              id='profile-pic'
              type="file"
              accept="image/*"
              required={false}
              onChange={updateProfilePicture}
            />
          </div>
          <div id='signup-profile'>(Profile picture NOT required)</div>
          {/* <label className='signup-inputs' htmlFor='profile-pic'>Upload profile picture (not required)</label> */}
          <div className="errors">
            {errors.profile_picture ? `${errors.profile_picture}` : ''}
          </div>
          <div className='signup-form'>
            <input
              className='signup-inputs'
              type='password'
              name='password'
              placeholder='Password *'
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
              placeholder='Confirm Password *'
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
      <div className='below-login-about'>
        <div>Savanah Trewman</div>
        <a href='https://www.linkedin.com/in/savanah-trewman/' target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
        <a href='https://github.com/strewm/odds-and-ends' target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
      </div>
    </div>
  );
};

export default SignUpForm;
