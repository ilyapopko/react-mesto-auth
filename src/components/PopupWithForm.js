import React from 'react';

import Popup from "./Popup";

const PopupWithForm = ({isOpen, onClose, onSubmit, name, title, submitDescription, children, isSubmitDisabled}) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form action="#" className="popup__container" name={`form_${name}`} onSubmit={onSubmit} noValidate>
        <h2 className="popup__header">{title}</h2>
        <fieldset className="popup__container-info">
          {children}
          <button className={`popup__save-button ${isSubmitDisabled ? 'popup__save-button_disabled' : ''}`}
                  type="submit" aria-label="Сохранить изменения"
                  disabled={isSubmitDisabled}
          >{submitDescription}</button>
        </fieldset>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}/>
      </form>
    </Popup>
  );
};

export default PopupWithForm;

