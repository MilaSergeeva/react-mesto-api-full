import React from "react";
import PopupWithForm from "./PopupWithForm.js";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  // const currentUser = React.useContext(CurrentUserContext);

  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      savebtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="url"
          name="avatar-link"
          placeholder="Ссылка на аватар"
          className="popup__input"
          autoComplete="off"
          ref={avatarInput}
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
