import React, {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({
                onEditAvatar,
                onEditProfile,
                onAddCard,
                cards,
                onCardClick,
                onCardLike,
                onCardDelete,
                onEditCard,
                onHoverCardCaption,
                onHoverLikeCard,
                onOutHover
              }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка"/>
          <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватарку"
                  onClick={onEditAvatar}/>
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль"
                onClick={onEditProfile}/>
        <p className="profile__specialization">{currentUser.about}</p>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddCard}/>
      </section>
      <section className="cards">
        {cards.map(item => {
          return (
            <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike}
                  onCardDelete={onCardDelete} onEditCard={onEditCard} onHoverCardCaption={onHoverCardCaption} onHoverLikeCard={onHoverLikeCard}
                  onOutHover={onOutHover}/>
          )
        })
        }
      </section>
    </main>
  );
};

export default Main;
