/* eslint-disable no-new */
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');

// создаем карточку
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        new BadRequestError(
          `Переданы некорректные данные. Ошибка: ${err.message}`
        );
      }
      next(err);
    });
};

// возвращаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

// удаляем карточку
// eslint-disable-next-line no-unused-vars
module.exports.deleteCards = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }

      res.status(200).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

// ставим лайк карточке
module.exports.addLikeToCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        new NotFoundError('Запрашиваемый ресурс не найден');
      }

      next(err);
    });
};

// убраем лайк с карточки
module.exports.deleteLikeToCard = (req, res, next) => {
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
      if (err.name === 'DocumentNotFoundError') {
        new NotFoundError('Запрашиваемый ресурс не найден');
      }

      next(err);
    });
};
