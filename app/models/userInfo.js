const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  name: String,
  tel: String,
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAnswer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserInfo", UserInfoSchema);
