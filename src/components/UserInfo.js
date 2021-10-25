import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({email, onLogout}) => {
  return (
    <div className={'header__info'}>
    <p className="header__email">{email}</p>
    <Link className="header__link" onClick={onLogout} to="/sign-in">
      Выйти
    </Link>
  </div>
);
};

export default UserInfo;