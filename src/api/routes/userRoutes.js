const express = require('express');
const { createUser, updateUser, getUser, getAllUsers, deleteUser } = require('../controllers/userController');
const verifyToken = require('../utils/jwt');

const router = express.Router();

router.post('/api/usuarios', verifyToken, createUser);
router.put('/api/usuarios/:id', verifyToken, updateUser);
router.get('/api/usuarios/:id', verifyToken, getUser);
router.get('/api/usuarios', verifyToken, getAllUsers);
router.delete('/api/usuarios/:id', verifyToken, deleteUser);

module.exports = router;