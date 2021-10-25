import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ViewAuthorPopup from "./ViewAuthorPopup";
import ViewLikePopup from "./ViewLikePopup";
import ErrorPopup from "./ErrorPopup";
import InfoTooltip from "./InfoTooltip";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { apiServer } from "../utils/Api";
import { auth } from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isViewAuthorPopupOpen, setIsViewAuthorPopupOpen] = useState(false);
  const [isViewLikePopupOpen, setIsViewLikePopupOpen] = useState(false);
  const [needUpdateViewLike, setNeedUpdateViewLike] = useState(false);
  const [popupOutputArea, setPopupOutputArea] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    clientY: 0
  });

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ status: null, message: null, url: null });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); //решение временно т.к. одно поле. После реализации бэка будет перенесено в структуру данных пользователя
  const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipMessage, setToolTipMessage] = useState({ message: "", fail: false });


  const history = useHistory();

  const showError = (err) => {
    setErrorMessage(err);
    setIsErrorPopupOpen(true);
  }

  useEffect(() => {
    apiServer.getUserProperties()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => {
        showError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    apiServer.getAllCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => {
        showError(err);
      });
  }, []);

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push('/');
    };
    // eslint-disable-next-line
  }, [isLoggedIn]);


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleUpdateUser = async (data) => {
    try {
      const updateData = await apiServer.updateUserProperties(data);
      setCurrentUser(updateData);
      handleCloseAllPopups();
    } catch (err) {
      showError(err);
    }
  }

  const handleUpdateAvatar = async (link) => {
    try {
      const updateData = await apiServer.updateUserAvatar(link);
      setCurrentUser(updateData);
      handleCloseAllPopups();
    } catch (err) {
      showError(err);
    }
  }

  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const toggleLikeCard = (card, isLiked, setUpdateCard) => {
    if (isLiked) {
      card.likes = card.likes.filter((user) => user._id !== currentUser._id);
    } else {
      card.likes.push(currentUser);
    }
    setUpdateCard(true);
    setNeedUpdateViewLike(true);
  }

  const handleCardLike = async (card, setUpdateCard) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    //Добавляем/удаляем текущего юзера в массив лайков карточки до получения ответа
    // от сервера для ускорения реакции интерфейса
    toggleLikeCard(card, isLiked, setUpdateCard);
    try {
      await apiServer.setLikeCard(isLiked, card._id);
    } catch (err) {
      showError(err);
      //обратим действие установочной функции так как сервер вернул ошибку
      toggleLikeCard(card, !isLiked, setUpdateCard);
    }
  }

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  const handleEditCard = (card) => {
    setSelectedCard(card);
    setIsAddCardPopupOpen(true);
  }

  const handleAddCard = async (data) => {
    const newCard = await apiServer.addCard(data);
    setCards([newCard, ...cards]);
  }

  //Функция временная, так как у сервера нет методов PATCH или PUT для карточек
  //TODO: Переделать после реализации backend
  const handleSaveCard = async (card, data) => {
    //Сначала удаляем карточку по алгоритму удаления
    await apiServer.deleteCard(card._id);
    //Дальше добавляем карточку по алгоритму добавления
    const newCard = await apiServer.addCard(data);
    //Обновляем список по алгоритму лайка из рефа
    setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
  }

  const handleSaveCardSubmit = async (card, data) => {
    try {
      if (!card) {
        await handleAddCard(data);
      } else {
        await handleSaveCard(card, data);
      }
      handleCloseAllPopups();
    } catch (err) {
      showError(err);
    }
  }

  const handleDeleteCardSubmit = async (card) => {
    try {
      await apiServer.deleteCard(card._id);
      setCards((cards) => {
        return cards.filter((c) => c._id !== card._id);
      });
      handleCloseAllPopups();
    } catch (err) {
      showError(err);
    }
  }

  const handleCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsViewAuthorPopupOpen(false);
    setIsViewLikePopupOpen(false);
    setNeedUpdateViewLike(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setToolTipMessage({ message: "", fail: false })
  }

  const handleCloseErrors = () => {
    setIsErrorPopupOpen(false);
  }

  const checkInputValidation = (input, setValid, setErrorMessage) => {
    if (!input.validity.valid) {
      setValid(false);
      setErrorMessage(input.validationMessage);
    } else {
      setValid(true);
    }
  }

  const handleHoverCardCaption = (card, area) => {
    setSelectedCard(card);
    setPopupOutputArea(area);
    setIsViewAuthorPopupOpen(true);
  }

  const handleOutHover = () => {
    handleCloseAllPopups();
  }

  const handleHoverLikeCard = (card, area) => {
    setSelectedCard(card);
    setPopupOutputArea(area);
    setIsViewLikePopupOpen(true);
  }


  const handleError = (error) => {
    console.log(error);
    setToolTipMessage({ message: "Что-то пошло не так! Попробуйте еще раз.\n " + error.message, fail: true });
    setIsInfoTooltipOpen(true);
  }

  const handleResponseAuth = (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      auth.checkToken(data.token)
        .then((userData) => {
          //вытащим данные имейла
          setUserEmail(userData.data.email);
          setIsLoggedIn(true);
          setToolTipMessage({ message: "Вы успешно авторизировались!", fail: false });
          setIsInfoTooltipOpen(true);
        })
    } else {
      setToolTipMessage({ message: "Вы успешно зарегистрировались!", fail: false });
      setIsInfoTooltipOpen(true);
      history.push('/sign-in');
    }
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password)
      .then(handleResponseAuth)
      .catch(handleError);

  };

  const handleRegister = ({ email, password }) => {
    console.log({ email, password });
    auth.register(email, password)
      .then(handleResponseAuth)
      .catch(handleError);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail('');
    setIsUserInfoOpened(false);
    setIsLoggedIn(false);
    history.push('/sign-in');
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // проверяем токен пользователя
      auth.checkToken(token)
        .then((userData) => {
          //вытащим данные имейла
          setUserEmail(userData.data.email);
          setIsLoggedIn(true);
        })
        .catch(handleError);
    }
  };

  //Ибо тернарный оператор выглядит уродливо
  if (isLoading) {
    return (<Spinner />);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar} onCheckValidation={checkInputValidation} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser} onCheckValidation={checkInputValidation} />
        <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups} onSaveCard={handleSaveCardSubmit}
          onCheckValidation={checkInputValidation} card={selectedCard} />
        <ConfirmDeletePopup card={selectedCard} isOpen={isConfirmDeletePopupOpen} onClose={handleCloseAllPopups}
          onDeleteCard={handleDeleteCardSubmit} />
        <ImagePopup currentCard={selectedCard} setCurrentCard={setSelectedCard} cards={cards} isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups} />
        <ViewAuthorPopup card={selectedCard} popupOutputArea={popupOutputArea} isOpen={isViewAuthorPopupOpen} />
        <ViewLikePopup card={selectedCard} popupOutputArea={popupOutputArea} isOpen={isViewLikePopupOpen}
          needUpdateViewLike={needUpdateViewLike} />
        <ErrorPopup isOpen={isErrorPopupOpen} errorMessage={errorMessage} onClose={handleCloseErrors} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={handleCloseAllPopups} message={tooltipMessage} />
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          isUserInfoOpened={isUserInfoOpened}
          setIsUserInfoOpened={setIsUserInfoOpened}
          onLogout={handleLogout}
        />
        <Switch>
          <ProtectedRoute exact path="/"
            isLoggedIn={isLoggedIn}
            cards={cards} card={selectedCard} component={Main}
            onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
            onEditCard={handleEditCard} onHoverCardCaption={handleHoverCardCaption}
            onHoverLikeCard={handleHoverLikeCard} onOutHover={handleOutHover}
          />
          <Route path="/sign-in">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onSubmit={handleLogin} onCheckValidation={checkInputValidation} />
            )}
          </Route>
          <Route path="/sign-up">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onSubmit={handleRegister} onCheckValidation={checkInputValidation} />
            )}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
