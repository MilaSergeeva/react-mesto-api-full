const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_SEVBER_ERROR = 500;
const ERROR_CODE_DOCUMENT_NOT_FOUND = 404;

// создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name: name,
      about: about,
      avatar: avatar,
      email: email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(ERROR_CODE_BAD_REQUEST).send({
            message: `Переданы некорректные данные. Ошибка: ${err.message}`,
          });
        } else {
          res.status(ERROR_CODE_SEVBER_ERROR).send({
            message: `Произошла ошибка ${err.message}`,
          });
        }
      })
  );
};

// получаем всех пользоватеоей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(() => {
      res
        .status(ERROR_CODE_SEVBER_ERROR)
        .send({ message: "Запрашиваемый ресурс не найден. Error status 500" });
    });
};

// находим пользователя
module.exports.getUserByID = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_DOCUMENT_NOT_FOUND)
          .send({ message: "Нет пользователя с таким id" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: `Запрашиваемый ресурс не найден. Ошибка: ${err.message}`,
      });
    });
};

// находим пользователя
module.exports.getCurrentUser = (req, res) => {
  User.findById({ _id: req.user._id }) // не по айдишнику, а по jwt токену
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_DOCUMENT_NOT_FOUND)
          .send({ message: "Нет пользователя с таким id" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: `Запрашиваемый ресурс не найден. Ошибка: ${err.message}`,
      });
    });
};

// обновление профиля
module.exports.updateUserInfoByID = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res
        .status(ERROR_CODE_BAD_REQUEST)
        .send({ message: "Переданы некорректные данные" });
    });
};

// обновление аватара
module.exports.updateUserAvatarByID = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res
        .status(ERROR_CODE_BAD_REQUEST)
        .send({ message: "Переданы некорректные данные" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtSecret = JWT_SECRET;
      // аутентификация успешна
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });

      // возвращаем токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res.status(401).send({ message: err.message });
    });
};
