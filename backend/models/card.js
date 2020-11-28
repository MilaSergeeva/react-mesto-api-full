const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      // validate: {
      //   validator(value) {
      //     return /^(http|https):\/\/[^ "]+$/.test(value);
      //   },
      // },
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('card', cardSchema);
