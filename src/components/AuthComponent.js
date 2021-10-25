import React, { useEffect, useState } from 'react';

function AuthComponent({ description, submitDescription, onChange, onSubmit, user, children, onCheckValidation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({email, password});
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    onCheckValidation(e.target, setIsEmailValid, setErrorMessageEmail);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    onCheckValidation(e.target, setIsPasswordValid, setErrorMessagePassword);
  }

  useEffect(() => {
    setIsSubmitDisabled(!(isEmailValid && isPasswordValid));
  }, [isEmailValid, isPasswordValid]);

  useEffect(() => {
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setIsSubmitDisabled(true);
  }, []);

  return (
    <section className="auth">
      <h2 className="auth-form__header">{description}</h2>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-form__input-label" htmlFor="email">
          <input
            type="email"
            name="email"
            className="auth-form__input"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            required
          />
          <span id="auth-form__input-error"
            className={`auth-form__input-error ${!isEmailValid ? 'auth-form__input-error_visible' : ''}`}>{errorMessageEmail}</span>
        </label>
        <label className="auth-form__input-label" htmlFor="password">
          <input
            type="password"
            name="password"
            className="auth-form__input"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <span id="auth-form__input-error"
            className={`auth-form__input-error ${!isPasswordValid ? 'auth-form__input-error_visible' : ''}`}>{errorMessagePassword}</span>
        </label>
        <button className={`auth-form__save-button ${isSubmitDisabled ? 'auth-form__save-button_disabled' : ''}`}
          type="submit" aria-label="Сохранить изменения"
          disabled={isSubmitDisabled}
        >{submitDescription}</button>
      </form>
      {children}
    </section>
  );
}

export default AuthComponent;
