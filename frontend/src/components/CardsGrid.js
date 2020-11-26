import React from "react";
import Card from "./Card.js";

const CardsGrid = ({ onCardClick, cards, onCardLike, onCardDelete }) => {
  return (
    <section className="places">
      {cards.map((place) => {
        return (
          <Card
            key={place._id}
            card={place}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
          />
        );
      })}
    </section>
  );
};

export default CardsGrid;
