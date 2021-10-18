import React, {useEffect, useCallback} from 'react';

const Popup = ({isOpen, onClose, name, children}) => {

  function handleCloseByOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const handleCloseByEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
      return () => {
        document.removeEventListener('keydown', handleCloseByEsc);
      };
    }
  }, [isOpen, handleCloseByEsc]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleCloseByOverlay}>
      {children}
    </div>
  );
};

export default Popup;

