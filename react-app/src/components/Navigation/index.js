import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';
import CreatePostingModal from '../Postings/CreatePostingModal';
// import CreatePosting from '../Postings/CreatePostingModal/CreatePosting';
import './Navigation.css';

const NavBar = () => {
  const [width, setWidth] = useState('0%');

  const openNav = () => {
    setWidth('20%');
  };

  const closeNav = () => {
    setWidth('0%');
  };

  return (
    <div className='navbar'>
      <i id='menu-open' className="fa-solid fa-bars" onClick={openNav}></i>
      <div className='nav-container' style={{ width: width }}>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
        <CreatePostingModal />
        <LogoutButton />
        <button id='button-close' onClick={closeNav}>Close</button>
      </div>
    </div>
  );
}

export default NavBar;
