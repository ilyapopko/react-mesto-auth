import React, {useCallback, useEffect} from 'react';
import errorIcon from "../images/errorIcon.svg";

const ErrorPopup = ({isOpen, errorMessage, onClose}) => {

  const handleCloseByOverlay = useCallback(
    (e) => {
      if (!e.target.classList.contains('error-identification')) {
        onClose();
      }
    }, [onClose]);

  const handleCloseByEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
      document.addEventListener('mousedown', handleCloseByOverlay);
      return () => {
        document.removeEventListener('keydown', handleCloseByEsc);
        document.removeEventListener('mousedown', handleCloseByOverlay);
      };
    }
  }, [isOpen, handleCloseByEsc, handleCloseByOverlay]);

  return (
    <div className={`popup popup_type_error ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__error-container error-identification" onMouseDown={handleCloseByOverlay}>
        <div className="popup__error error-identification">
          <img className="popup__error-icon error-identification" src={errorIcon} alt="Картинка ошибки"/>
          <h2 className="popup__error-header error-identification">Ошибка обращения к серверу:</h2>
        </div>
        <p
          className="popup__error-caption error-identification">
          {`${errorMessage.status} ${errorMessage.message} url=${errorMessage.url}`}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
