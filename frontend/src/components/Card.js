import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ card, onCardClick, onCardLike, onCardDelete, ...rest }) => {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = isOwn
    ? "place__bin-btn"
    : "place__bin-btn_disabled";

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__like-btn ${
    isLiked ? "place__like-btn_on" : "place__like-btn"
  }`;

  return (
    <figure className="place">
      <img
        className="place__img"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <figcaption className="place__container">
        <h3 className="place__title">{card.name}</h3>
        <button
          type="button"
          aria-label="Лайк"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <div className="place__likes-counter">{card.likes.length}</div>
      </figcaption>
      <button
        type="button"
        aria-label="Корзина"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
    </figure>
  );
};

export default Card;
