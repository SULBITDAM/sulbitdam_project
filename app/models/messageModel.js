// app/models/messageModel.js
const SurveyResult = require("../schema/SurveyResult");

exports.saveSurveyResult = async ({ name, tel, result }) => {
  const survey = new SurveyResult({ name, tel, result });
  return await survey.save();
};
