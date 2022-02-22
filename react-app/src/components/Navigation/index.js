import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../Auth/LogoutButton';
import CreatePostingModal from '../Postings/CreatePostingModal';
// import CreatePosting from '../Postings/CreatePostingModal/CreatePosting';
import './Navigation.css';

const NavBar = () => {
  const [width, setWidth] = useState('0%');

  const user = useSelector(state => state.session.user);

  const openNav = () => {
    setWidth('80px');
  };

  const closeNav = () => {
    setWidth('0%');
  };

  return (
    <div className='navbar'>
      <i id='menu-open' className="fa-solid fa-bars" onClick={openNav}></i>
      <div className='nav-container' style={{ width: width }}>
        <i id='button-close' className="fa-solid fa-xmark" onClick={closeNav}></i>
        <div className='nav-links'>
          <NavLink to='/' exact={true} onClick={closeNav}>
            <i id='navbar-home' className="fa-solid fa-house-chimney"></i>
          </NavLink>
          <NavLink to={`/${user.username}`} exact={true} onClick={closeNav}>
            <i id='navbar-profile' className="fa-solid fa-id-card"></i>
          </NavLink>
          <CreatePostingModal />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
