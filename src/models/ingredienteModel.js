import { DataTypes } from 'sequelize';
import { sequelize } from '../database/configdb.js';

const Ingrediente = sequelize.define('ingrediente', {
  idingredientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  Nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  timestamps: false,
});


export default Ingrediente;
