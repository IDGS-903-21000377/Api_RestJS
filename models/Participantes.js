const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participante = sequelize.define('Participante', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  twitter: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  ocupacion: { type: DataTypes.STRING, allowNull: false },
  avatarUrl: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Participante;
