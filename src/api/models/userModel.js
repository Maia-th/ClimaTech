const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  idUsers: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  access: {
    type: DataTypes.ENUM('root', 'padrão'),
    allowNull: false,
  },
},{
  tableName: 'Usuarios',
  timestamps: false,
});

module.exports = User;