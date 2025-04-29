const express = require("express");
const router = express.Router();
const { generateReport } = require("../controllers/reportController");

router.get("/", generateReport); // Fetch report data

module.exports = router;
