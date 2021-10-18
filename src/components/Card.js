import React, { useContext, useRef, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete, onEditCard, onHoverCardCaption, onHoverLikeCard, onOutHover }) => {
  const currentUser = useContext(CurrentUserContext);
  const imageRef = useRef();
  const captionRef = useRef();
  const likeRef = useRef();
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const needUpdateCard = useState(false);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    needUpdateCard[1](false); //обнулим флаг обновления
    onCardLike(card, needUpdateCard[1]);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleEditClick() {
    onEditCard(card);
  }

  function handleSetupImageProperties() {
    if (imageRef.current.naturalWidth < 150) {
      imageRef.current.style.objectFit = 'none';
    }
  }

  function handleShowAuthorInfo(e) {
    const element = captionRef.current;
    onHoverCardCaption(card,
      {
        left: element.offsetParent.offsetLeft + element.offsetLeft,
        top: element.offsetParent.offsetTop + element.offsetTop,
        right: document.documentElement.clientWidth - element.offsetParent.offsetLeft - element.offsetLeft,
        bottom: document.documentElement.clientHeight - element.offsetParent.offsetTop - element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        clientY: e.clientY,
      });
  }

  function handleShowLikeInfo(e) {
    const element = likeRef.current;
    onHoverLikeCard(card,
      {
        left: element.offsetParent.offsetLeft + element.offsetLeft,
        top: element.offsetParent.offsetTop + element.offsetTop,
        right: document.documentElement.clientWidth - element.offsetParent.offsetLeft - element.offsetLeft,
        bottom: document.documentElement.clientHeight - element.offsetParent.offsetTop - element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        clientY: e.clientY
      });
  }

  function handleHideInfo() {
    onOutHover();
  }

  return (
    <article className="card">
      <img src={card.link} alt={`Фотография ${card.name}`} className="card__image" ref={imageRef}
        onClick={handleClick} onLoad={handleSetupImageProperties} />
      <div className="card__button-container">
        <button
          className={`card__delete-button ${isOwn ? 'card__delete-button_visible' : ''}`}
          type="button" aria-label="Удалить карточку" onClick={handleDeleteClick} />
        <button
          className={`card__edit-button ${isOwn ? 'card__edit-button_visible' : ''}`}
          type="button" aria-label="Редактировать карточку" onClick={handleEditClick} />
      </div>
      <div className="card__description">
        <h2 className="card__caption" ref={captionRef} onMouseEnter={handleShowAuthorInfo}
          onMouseOut={handleHideInfo}>{card.name}</h2>
        <div className="card__like-container">
          <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} type="button"
            aria-label="Лайкнуть" onClick={handleLikeClick}
            ref={likeRef} onMouseEnter={handleShowLikeInfo} onMouseOut={handleHideInfo} />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
