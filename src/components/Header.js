import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import UserInfo from './UserInfo';

const Header = ({ isLoggedIn, userEmail, onLogout, isUserInfoOpened, setIsUserInfoOpened }) => {

  const handleMenuClick = (e) => {
    setIsUserInfoOpened(!isUserInfoOpened);
  };

  return (
    <header className="header">
      {isLoggedIn & isUserInfoOpened ? (<UserInfo email={userEmail} onLogout={onLogout} />) : ''}
      <div className="header__container">
        {/*eslint-disable-next-line*/}
        <a href="#" className="header__logo" aria-label="Логотип" target="_blank" />
        {isLoggedIn ? (
          <nav className="header__menu">
            <p className="header__email header__email_hidden">{userEmail}</p>
            <button type="button" className="header__link header__link_hidden" onClick={onLogout}>Выйти</button>
            <button type="button" className={`header__menu-button ${isUserInfoOpened ? 'header__menu-button_opened' : ''}`} onClick={handleMenuClick} />
          </nav>
        ) : (
          <nav className="header__menu">
          <Switch>
            <Route path="/sign-up">
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            </Route>
          </Switch>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
