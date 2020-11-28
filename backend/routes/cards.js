const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  createCard,
  getCards,
  deleteCards,
  addLikeToCard,
  deleteLikeToCard,
} = require("../controllers/cards");

router.get("/cards", getCards);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(8).max(30),
      link: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(http|https)://[^ "]+$')),
    }),
  }),
  createCard
);

router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
    query: Joi.object()
      .keys({
        id: Joi.string(),
      })
      .unknown(true),
  }),
  deleteCards
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
  }),
  addLikeToCard
);

router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
  }),
  deleteLikeToCard
);

module.exports = router;
