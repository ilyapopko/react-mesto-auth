import React from 'react';
import { Link } from 'react-router-dom';
import AuthComponent from './AuthComponent';


function Register(props) {
  return (
    <AuthComponent description="Регистрация" submitDescription="Зарегистрироваться" {...props}>
      <p className="auth__caption">
        Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link>
      </p>
    </AuthComponent>
  );
}

export default Register;
