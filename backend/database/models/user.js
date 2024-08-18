const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define("user", {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  username:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
    unique: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false
  }
});

module.exports = User;