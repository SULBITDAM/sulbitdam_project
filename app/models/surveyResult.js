const mongoose = require("mongoose");

const SurveyResultSchema = new mongoose.Schema({
  name: String,
  phone: String,
  answers: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SurveyResult", SurveyResultSchema);
