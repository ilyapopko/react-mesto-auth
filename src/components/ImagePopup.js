import Popup from "./Popup";
import previousButtonIcon from "../images/arrowLeft.svg";
import nextButtonIcon from "../images/arrowRight.svg";
import React, {useCallback, useEffect} from "react";

const ImagePopup = ({isOpen, onClose, currentCard, setCurrentCard, cards}) => {

  const handlePreviousCard = useCallback(() => {
    const currentIndex = cards.indexOf(currentCard);
    if (currentIndex - 1 < 0) {
      setCurrentCard(cards[cards.length - 1]);
    } else {
      setCurrentCard(cards[currentIndex - 1]);
    }
  },[cards, currentCard, setCurrentCard]);

  const handleNextCard = useCallback(() => {
    const currentIndex = cards.indexOf(currentCard);
    if (currentIndex + 1 > cards.length - 1) {
      setCurrentCard(cards[0]);
    } else {
      setCurrentCard(cards[currentIndex + 1]);
    }
  },[cards, currentCard, setCurrentCard]);

  const handlePressButtonKeyboard = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        handlePreviousCard();
      }
    }, [handleNextCard, handlePreviousCard]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handlePressButtonKeyboard);
      return () => {
        document.removeEventListener('keydown', handlePressButtonKeyboard);
      };
    }
  }, [isOpen, handlePressButtonKeyboard]);

  return (
    <Popup isOpen={isOpen} name="view-card" onClose={onClose}>
      <button className="popup__previous-button" type="button" aria-label="Предыдущая карточка" onClick={handlePreviousCard}>
        <img src={previousButtonIcon} alt="Предыдущая карточка" className="popup__previous-image"/>
      </button>
      <div className="popup__photo-container">
        <img src={isOpen ? currentCard.link : ''} alt={`Фотография ${isOpen ? currentCard.name : ''}`} className="popup__image"/>
        <p className="popup__photo-caption">{isOpen ? currentCard.name : ''}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}/>
      </div>
      <button className="popup__next-button" type="button" aria-label="Следующая карточка" onClick={handleNextCard}>
        <img src={nextButtonIcon} alt="Следующая карточка" className="popup__next-image"/>
      </button>
    </Popup>
  );
};

export default ImagePopup;
