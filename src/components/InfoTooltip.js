import React from 'react';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <Popup name="tooltip" isOpen={isOpen} onClose={onClose}>
      <div className="popup__container" >
        <div
          className={`popup__tooltip-status popup__tooltip-status_type_${message.fail ? 'fail' : 'ok'}`}
        />
        <h2 className="popup__tooltip-message">
          {message.message}
        </h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </Popup>
  );
}

export default InfoTooltip;
