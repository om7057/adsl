const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);

module.exports = router;
