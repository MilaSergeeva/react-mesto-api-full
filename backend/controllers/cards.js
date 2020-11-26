const Card = require("../models/card");

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_SEVBER_ERROR = 500;
const ERROR_CODE_DOCUMENT_NOT_FOUND = 404;

// создаем карточку
module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE_BAD_REQUEST).send({
          message: `Переданы некорректные данные. Ошибка: ${err.message}`,
        });
      }
      return res
        .status(ERROR_CODE_SEVBER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

// возвращаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => {
      res.status(ERROR_CODE_SEVBER_ERROR).send({ message: "Произошла ошибка" });
    });
};

// удаляем карточку
module.exports.deleteCards = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })

    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_DOCUMENT_NOT_FOUND).send({
          message: "Запрашиваемый ресурс не найлен.",
        });
      }

      return res.status(ERROR_CODE_BAD_REQUEST).send({
        message: `Переданы некорректные данные. Ошибка: ${err.message}`,
      });
    });
};

// ставим лайк карточке
module.exports.addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_DOCUMENT_NOT_FOUND).send({
          message: "Запрашиваемый ресурс не найлен.",
        });
      }

      return res.status(ERROR_CODE_BAD_REQUEST).send({
        message: `Переданы некорректные данные. Ошибка: ${err.message}`,
      });
    });
};

// убраем лайк с карточки
module.exports.deleteLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_DOCUMENT_NOT_FOUND).send({
          message: "Запрашиваемый ресурс не найлен.",
        });
      }

      return res.status(ERROR_CODE_BAD_REQUEST).send({
        message: `Переданы некорректные данные. Ошибка: ${err.message}`,
      });
    });
};
