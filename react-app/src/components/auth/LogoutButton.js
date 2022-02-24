import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/session';
import './LogoutButton.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push('/login');
  };

  return <i id='logout-btn' className="fa-solid fa-arrow-right-from-bracket" onClick={onLogout}></i>;

};

export default LogoutButton;
