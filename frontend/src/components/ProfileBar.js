import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const ProfileBar = ({ onEditProfile, onEditAvatar, onAddPlace }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__flex-centr">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <div className="profile__avatar-cover" onClick={onEditAvatar} />
        </div>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile-info__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile-info__occupation">{currentUser.about}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Добавить"
        className="profile__add-button"
        onClick={onAddPlace}
      ></button>
    </section>
  );
};

export default ProfileBar;
