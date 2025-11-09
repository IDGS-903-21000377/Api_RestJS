const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ApiRest', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql', // Si quieres SQL Server, cambia a 'mssql'
  logging: false
});

module.exports = sequelize;
