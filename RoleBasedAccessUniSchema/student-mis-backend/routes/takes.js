const express = require('express');
const { getTakes } = require('../controllers/takesController');

const router = express.Router();

// Get all takes (student-course relationships)
router.get('/', getTakes);

module.exports = router;
