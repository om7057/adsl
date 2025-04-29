const express = require('express');
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Create a new course
router.post('/', createCourse);

// Update a course
router.put('/:course_id', updateCourse);

// Delete a course
router.delete('/:course_id', deleteCourse);

module.exports = router;
