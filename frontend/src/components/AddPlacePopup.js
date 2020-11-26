import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onReset }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  const resetForm = () => {
    setCardName("");
    setCardLink("");
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };
  const handleCardLinkChange = (event) => {
    setCardLink(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      savebtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <div className="popup__input-container">
        <input
          type="text"
          name="place-name"
          placeholder="Название"
          className="popup__input"
          minLength="1"
          maxLength="30"
          required
          autoComplete="off"
          onChange={handleCardNameChange}
        />
        <span className="popup__error"></span>
      </div>
      <div className="popup__input-container">
        <input
          type="url"
          name="place-link"
          placeholder="Ссылка на картинку"
          className="popup__input"
          autoComplete="off"
          required
          onChange={handleCardLinkChange}
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
