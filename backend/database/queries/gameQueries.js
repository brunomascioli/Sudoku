const { Op } = require('sequelize');
const GameTime = require('../models/gameTime');

async function getGameResultsByDifficulty() {
  try {
    const results = {};

    const easyResults = await GameTime.findAll({
      where: { difficulty: 'easy' },
      order: [['game_time', 'ASC']],
      limit: 10
    });

    const mediumResults = await GameTime.findAll({
      where: { difficulty: 'medium' },
      order: [['game_time', 'ASC']],
      limit: 10
    });

    const hardResults = await GameTime.findAll({
      where: { difficulty: 'hard' },
      order: [['game_time', 'ASC']],
      limit: 10
    });

    results.easy = easyResults;
    results.medium = mediumResults;
    results.hard = hardResults;

    return results;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getGameResultsByDifficulty };
