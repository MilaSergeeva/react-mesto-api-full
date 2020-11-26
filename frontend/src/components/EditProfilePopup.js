import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      savebtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          value={name}
          type="text"
          name="user-name"
          placeholder="Имя"
          className="popup__input"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          onChange={handleNameChange}
          required
        />
        <span className="popup__error"></span>
      </div>
      <div className="popup__input-container">
        <input
          value={description}
          type="text"
          name="user-occupation"
          placeholder="Род деятельности"
          className="popup__input"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
