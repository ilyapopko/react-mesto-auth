import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({isOpen, onClose, onDeleteCard, onSetSubmitDisabled, card}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitDisabled(true);
    onDeleteCard(card)
      .finally(() => {
        setIsLoading(false);
        setIsSubmitDisabled(false);
      });
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirm-delete" isOpen={isOpen}
                   onClose={onClose} submitDescription={isLoading ? 'Удаление...' : 'Да'}
                   onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled}/>
  );
};

export default ConfirmDeletePopup;
