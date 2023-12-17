const Sequelize = require('sequelize');
const sequelize = require('../config.js/database'); 

const Task = sequelize.define('Task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Task;
