import React from 'react';

const LikeUser = ({user}) => {
  return (
    <li className="popup__like-user">
      <img className="popup__like-user-avatar" src={user.avatar} alt="Аватарка"/>
      <p className="popup__like-user-name">{user.name}</p>
    </li>
  );
};

export default LikeUser;
