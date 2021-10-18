import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onSaveCard, onCheckValidation, card}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageLink, setErrorMessageLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!card) {
      setName('');
      setLink('');
      setIsNameValid(false);
      setIsLinkValid(false);
      setIsSubmitDisabled(true);
    } else {
      setName(card.name);
      setLink(card.link);
      setIsNameValid(true);
      setIsLinkValid(true);
      setIsSubmitDisabled(false);
    }
    setErrorMessageName('');
    setErrorMessageLink('');
  }, [isOpen, card]);

  useEffect(() => {
    setIsSubmitDisabled(!(isNameValid && isLinkValid));
  }, [isNameValid, isLinkValid]);

  function handleNameChange(e) {
    setName(e.target.value);
    onCheckValidation(e.target, setIsNameValid, setErrorMessageName);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    onCheckValidation(e.target, setIsLinkValid, setErrorMessageLink);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitDisabled(true);
    onSaveCard(card, {name, link})
      .finally(() => {
        setIsLoading(false);
        setIsSubmitDisabled(false);
      });
  }

  return (
    <PopupWithForm title={!card ? 'Новое место' : 'Редактирование места'} name="add-card" isOpen={isOpen}
                   onClose={onClose}
                   submitDescription={isLoading ? !card ? 'Добавление...' : 'Сохранение...' : !card ? 'Добавить' : 'Сохранить'}
                   onSubmit={handleSubmit}
                   isSubmitDisabled={isSubmitDisabled}>
      <input value={name} type="text" className="popup__edit-field" id="place-name" placeholder="Название" name="name"
             minLength="2" maxLength="30" required onChange={handleNameChange}/>
      <span id="place-name-error"
            className={`popup__input-error ${!isNameValid ? 'popup__input-error_visible' : ''}`}>{errorMessageName}</span>
      <input value={link} type="url" className="popup__edit-field" id="place-link" placeholder="Ссылка на картинку"
             name="link"
             required onChange={handleLinkChange}/>
      <span id="place-link-error"
            className={`popup__input-error ${!isLinkValid ? 'popup__input-error_visible' : ''}`}>{errorMessageLink}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
