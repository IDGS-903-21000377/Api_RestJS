require('dotenv').config(); // debe ir primero
const { Sequelize } = require('sequelize');

// Usamos DATABASE_URL directamente
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // true si quieres debug
});

module.exports = sequelize;

