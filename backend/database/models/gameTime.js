const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Importa o modelo User para criar a associação

const GameTime = sequelize.define("game_time", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  game_time: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,
  tableName: 'game_times' // Nome da tabela no banco de dados
});

// Criação da associação entre User e GameTime
User.hasMany(GameTime, { foreignKey: 'user_id' });
GameTime.belongsTo(User, { foreignKey: 'user_id' });

module.exports = GameTime;
