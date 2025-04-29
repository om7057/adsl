const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/", getDashboardStats); // Fetch dashboard stats

module.exports = router;
