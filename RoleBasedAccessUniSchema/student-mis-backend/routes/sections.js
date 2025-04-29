const express = require('express');
const { getSections } = require('../controllers/sectionController');
const router = express.Router();

// Get all sections
router.get('/', getSections);

module.exports = router;
