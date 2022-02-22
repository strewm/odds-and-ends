import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <i id='logout-btn' className="fa-solid fa-arrow-right-from-bracket" onClick={onLogout}></i>;

};

export default LogoutButton;
