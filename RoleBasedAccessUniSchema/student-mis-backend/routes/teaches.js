const express = require('express');
const { getTeaches } = require('../controllers/teachesController');
const router = express.Router();

// Get all teaches
router.get('/', getTeaches);

module.exports = router;
