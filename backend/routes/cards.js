const router = require("express").Router();

const {
  createCard,
  getCards,
  deleteCards,
  addLikeToCard,
  deleteLikeToCard,
} = require("../controllers/cards");

router.post("/cards", createCard);
router.get("/cards", getCards);
router.delete("/cards/:cardId", deleteCards);
router.put("/cards/:cardId/likes", addLikeToCard);
router.put("/cards/likes/:cardId", addLikeToCard);
router.delete("/cards/:cardId/likes", deleteLikeToCard);
router.delete("/cards/likes/:cardId", deleteLikeToCard);

module.exports = router;
