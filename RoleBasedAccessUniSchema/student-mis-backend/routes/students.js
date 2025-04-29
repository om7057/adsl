const express = require('express');
const { getStudents, createStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

// Get all students
router.get('/', getStudents);

// Add a new student
router.post('/', createStudent);

// Delete a student
router.delete('/:id', deleteStudent);

module.exports = router;
