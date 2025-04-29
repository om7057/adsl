const express = require('express');
const { getInstructors, createInstructor, updateInstructor, deleteInstructor } = require('../controllers/instructorController');
const router = express.Router();

// Get all instructors
router.get('/', getInstructors);

// Create a new instructor
router.post('/', createInstructor);

// Update an instructor
router.put('/:ID', updateInstructor);

// Delete an instructor
router.delete('/:ID', deleteInstructor);

module.exports = router;
