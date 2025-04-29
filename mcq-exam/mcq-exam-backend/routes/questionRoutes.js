const express = require("express");
const router = express.Router();
const { addQuestion, getQuestions } = require("../controllers/questionController");

router.post("/", addQuestion);
router.get("/", getQuestions);

module.exports = router;
