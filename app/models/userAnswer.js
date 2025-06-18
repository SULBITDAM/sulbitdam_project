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

module.exports =
  mongoose.models.UserAnswer || mongoose.model("UserAnswer", UserAnswerSchema);
