const express = require('express');
const { getDepartments, addDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const router = express.Router();

router.get('/', getDepartments);
router.post('/', addDepartment);
router.put('/:dept_name', updateDepartment);
router.delete('/:dept_name', deleteDepartment);

module.exports = router;
