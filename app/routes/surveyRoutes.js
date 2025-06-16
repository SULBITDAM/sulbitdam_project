const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/messageController");

router.post("/survey", surveyController.submitSurvey);

module.exports = router;
