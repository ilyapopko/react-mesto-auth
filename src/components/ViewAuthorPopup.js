import React from 'react';

const MIN_HEIGHT_POPUP = 184;
const ViewAuthorPopup = ({isOpen, card, popupOutputArea}) => {
  function setPosition() {
    if (!isOpen) {
      return {};
    }
    //Костыльный расчет приблизительной высоты так как размер дива измениться после подстановки значений
    if (popupOutputArea.clientY < MIN_HEIGHT_POPUP) {
      //места для вывода окошка не хватает - выводим вниз
      return {left: popupOutputArea.left, top: popupOutputArea.top + popupOutputArea.height};
    }
    return {left: popupOutputArea.left, bottom: popupOutputArea.bottom};
  }

  return (
    <div className={`popup popup_type_view-author ${isOpen ? 'popup_opened' : ''}`} style={setPosition()}>
      <img className="popup__card-author-avatar" src={isOpen ? card.owner.avatar : ''} alt="Аватарка"/>
      <p className="popup__card-author-name">{isOpen ? card.owner.name : ''}</p>
      <p className="popup__card-author-about">{isOpen ? card.owner.about : ''}</p>
    </div>
  );
};

export default ViewAuthorPopup;

