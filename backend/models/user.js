const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [
    //   { validator: validators.notEmpty, msg: "Пустая строка" },
    //   { validator: validators.isEmail, msg: "Введите email" },
    // ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    //   validate: { validator: validators.notEmpty, msg: "Пустая строка" },
    // },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return user;
      });
    });
};

// userSchema.methods.toJSON = function () {
//   let obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

module.exports = mongoose.model("user", userSchema);
