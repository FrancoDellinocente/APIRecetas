import { DataTypes } from 'sequelize';
import { sequelize } from '../database/configdb.js';


const Receta = sequelize.define('receta', {
  idreceta: {
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
  Descripcion: {
    type: DataTypes.STRING(1000),
    allowNull: true,
    defaultValue: null,
  },
}, {
  timestamps: false,
});


export default Receta;
