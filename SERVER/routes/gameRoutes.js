const express = require('express');
const { createGame, getGames } = require('../controllers/gameController');
const router = express.Router();

router.post('/games', createGame);
router.get('/games', getGames);

module.exports = router;
