import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import * as userAuth from "../utils/authorization.js";
import { getToken, removeToken, setToken } from "../utils/token";
import Header from "./Header.js";
import CardsGrid from "./CardsGrid.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { api as apiClient, buildApiClient } from "../utils/index.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.js";
import InternalPageWtihProfileBar from "./InternalPageWtihProfileBar.js";

import GenericNotFound from "./GenericNotFound";

let api = apiClient;

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
  const [isInfoToolsPopupOpen, setIsInfoToolsPopupOpen] = useState();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [regUserData, setRegUserData] = useState({
    email: "",
    password: "",
  });
  const [messageOnLogin, setMessageOnLogin] = useState("");
  const [messageOnRegister, setMessageOnRegister] = useState("");

  const history = useHistory();

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsInfoToolsPopupOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleUpdateUser = function (userInfo) {
    api
      .updateUserInfo(userInfo)
      .then((serverUserInfo) => {
        setСurrentUser((prevData) => ({
          ...prevData,
          ...serverUserInfo,
        }));
      }, closeAllPopups())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  const handleUpdateAvatar = (userAvatar) => {
    api
      .updateAvatar(userAvatar)
      .then((serverUserInfo) => {
        setСurrentUser(serverUserInfo);
      }, closeAllPopups())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      //Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => card._id !== c._id);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  const handleAddPlaceSubmit = (newCard) => {
    api
      .postCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      }, closeAllPopups())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  //ввод данных при логине
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  const handleLogin = (email, password) => {
    userAuth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setLoginData({ email: "", password: "" });
        setMessageOnLogin("");

        setLoggedIn(true);

        history.push("/users/me");
      })
      .catch((err) => {
        setMessageOnLogin("Ошибка авторизации. Повторите попытку.");
      });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (email, password) => {
    console.log("start register");
    userAuth
      .register(email, password)
      .then(() => {
        setMessageOnRegister("");
        setIsInfoToolsPopupOpen(true);
        setSignupSuccess(true);

        history.push("/signin");
      })
      .catch(() => {
        setIsInfoToolsPopupOpen(true);
        setSignupSuccess(false);
        setMessageOnRegister("Проверьте введенные данные");
      });
  };

  React.useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setLoggedIn(false);

      return;
    }

    api = buildApiClient(jwt);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cardElements]) => {
        setСurrentUser(userInfo);
        setCards(cardElements);
      })
      .catch((err) => {
        // potenitally need to log out
        setLoggedIn(false);
        removeToken();
      });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Route exact path="/">
          {loggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />}
        </Route>
        <Route exact path="/react-mesto-auth">
          {loggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />}
        </Route>

        <div className="page">
          <Header handleLogout={handleLogout} currentUser={currentUser} />

          <main className="content">
            <Switch>
              <ProtectedRoute
                exact
                path="/users/me"
                loggedIn={loggedIn}
                component={InternalPageWtihProfileBar}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                childComponent={CardsGrid}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />

              <Route exact path="/signin">
                <Login
                  onLogin={handleLogin}
                  onChange={handleLoginChange}
                  loginData={loginData}
                  messageOnLogin={messageOnLogin}
                />
              </Route>
              <Route exact path="/signup">
                <Register
                  onRegister={handleRegister}
                  onChange={handleRegisterChange}
                  regUserData={regUserData}
                  messageOnRegister={messageOnRegister}
                />
              </Route>
              <Route path="*">
                <GenericNotFound />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>

        <section className="popup-forms">
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm name="card-del" title="Вы уверены?" savebtn="Да" />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            success={signupSuccess}
            isOpen={isInfoToolsPopupOpen}
            onClose={closeAllPopups}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
