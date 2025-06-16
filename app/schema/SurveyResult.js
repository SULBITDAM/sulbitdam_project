// app/schema/SurveyResult.js
const mongoose = require("mongoose");

const surveyResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  result: {
    type: mongoose.Schema.Types.Mixed, // 문자열 또는 JSON 모두 허용
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SurveyResult", surveyResultSchema);
