const express = require('express');
const { createUser, updateUser, getUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/api/usuarios', createUser);
router.put('/api/usuarios/:id', updateUser);
router.get('/api/usuarios/:id', getUser);
router.delete('/api/usuarios/:id', deleteUser);

module.exports = router;