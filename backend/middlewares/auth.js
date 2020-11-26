const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: "Необходима авторизация. Токен не валидный." });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
