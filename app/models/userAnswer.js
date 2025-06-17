const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema({
  answers: [String],
  result: {
    title: String,
    desc: String,
    image: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserAnswer", UserAnswerSchema);
