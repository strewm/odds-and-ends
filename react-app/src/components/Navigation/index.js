import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';
import CreatePostingModal from '../Postings/CreatePostingModal';
// import CreatePosting from '../Postings/CreatePostingModal/CreatePosting';
import './Navigation.css';

const NavBar = () => {
  const [width, setWidth] = useState('0%');

  const openNav = () => {
    setWidth('25%');
  };

  const closeNav = () => {
    setWidth('0%');
  };

  return (
    <>
      <button onClick={openNav}>Open</button>
      <div className='nav-container' id='mySidenav' style={{ width: width }}>
        <button onClick={closeNav}>Close</button>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
        {/* <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <CreatePostingModal />
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul> */}
      </div>
    </>
  );
}

export default NavBar;
