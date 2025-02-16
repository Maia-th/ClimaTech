const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');  

const Inscricao = sequelize.define('Inscricao', {
  idInscricao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true, 
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  }
}, {
  tableName: 'Inscricoes',  
  timestamps: false,  
});

module.exports = Inscricao;
