import React, {useEffect, useState} from 'react';
import {formattingUserCount} from "../utils/utils";
import LikeUser from "./LikeUser";

const MIN_HEIGHT_POPUP = 45;

const ViewLikePopup = ({isOpen, card, popupOutputArea, needUpdateViewLike}) => {
  const needUpdateView = useState(false);

  useEffect(() => {
    needUpdateView[1](needUpdateViewLike);
  }, [needUpdateViewLike, needUpdateView]);

  function setPosition() {
    if (!isOpen) {
      return {};
    }
    //На момент вывода окошка не знаем истинную высоту, поэтому делаем костыльный расчет приблизительной высоты
    const approximateHeight = MIN_HEIGHT_POPUP * card.likes.length;
    if (popupOutputArea.clientY < approximateHeight) {
      //места для вывода окошка не хватает - выводим вниз
      return {right: popupOutputArea.right, top: popupOutputArea.top + popupOutputArea.height};
    }
    return {right: popupOutputArea.right, bottom: popupOutputArea.bottom};
  }

  return (
    <div className={`popup popup_type_view-likes ${isOpen ? 'popup_opened' : ''}`} style={setPosition()}>
      <h2
        className="popup__header popup__header_size_small">
        {`Оценили:  ${isOpen ? card.likes.length : 0} ${isOpen ? formattingUserCount(card.likes.length) : 'человек'}:`}
      </h2>
      <ul className="popup__like-users">
        {isOpen ? card.likes.map(user => {
          return (<LikeUser key={user._id} user={user}/>)
        }) : ''}
      </ul>
    </div>
  );
};

export default ViewLikePopup;

