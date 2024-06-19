const express = require('express');
const { register, login, logout, getOnlineUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/online-users', getOnlineUsers);

module.exports = router;
