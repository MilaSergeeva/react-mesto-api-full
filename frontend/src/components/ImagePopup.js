import React from "react";

function ImagePopup({ card, onClose, ...rest }) {
  return (
    <div className={`popup popup-pic ${card && "popup_opened"}`}>
      <div className="popup-pic__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        ></button>
        <figure className="popup-pic_place">
          <img className="popup-pic__img" src={card.link} alt={card.name} />
          <figcaption>
            <h3 className="popup-pic__title">{card.name}</h3>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
