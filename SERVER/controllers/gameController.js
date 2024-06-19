const { Game } = require('../models');

const createGame = async (req, res) => {
  const { player1, player2 } = req.body;
  try {
    const game = await Game.create({ player1, player2 });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createGame, getGames };
