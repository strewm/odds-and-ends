import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../Auth/LogoutButton';
import CreatePostingModal from '../Postings/CreatePostingModal';
import Search from '../Search';
import textLogo from '../Images/text-logo.png';
import './Navigation.css';

const NavBar = () => {
  const [width, setWidth] = useState('0%');

  const user = useSelector(state => state.session.user);

  const openNav = () => {
    setWidth('91.5px');
  };

  const closeNav = () => {
    setWidth('0%');
  };

  return (
    <div className='navbar'>
      <div>
        <i id='menu-open' className="fa-solid fa-bars" onClick={openNav}></i>
      </div>
      <NavLink to='/' exact={true}>
        <img id='nav-logo' src={textLogo} alt='text logo'/>
      </NavLink>
      <Search />
      <div className='nav-container' style={{ width: width }}>
        <i id='button-close' className="fa-solid fa-xmark" onClick={closeNav}></i>
        <div className='nav-links'>
          <NavLink to='/' exact={true} onClick={closeNav}>
            <i id='navbar-home' className="fa-solid fa-house-chimney"></i>
          </NavLink>
          <NavLink to={`/${user.username}`} exact={true} onClick={closeNav}>
            <i id='navbar-profile' className="fa-solid fa-id-card"></i>
          </NavLink>
          <CreatePostingModal closeNav={closeNav}/>
          <LogoutButton />
        </div>
        <div className='navbar-about'>
          <a href='https://www.linkedin.com/in/savanah-trewman/' target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href='https://github.com/strewm/odds-and-ends' target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
