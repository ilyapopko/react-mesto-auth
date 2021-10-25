import React from 'react';
import AuthComponent from './AuthComponent';

function Login(props) {
  return <AuthComponent description="Вход" submitDescription="Войти" {...props} />;
}

export default Login;
