import { DataTypes} from 'sequelize';
import {sequelize} from '../database/configdb.js';


const RecIng = sequelize.define('receta_ingredientes', {
  idreceta_ingredientes: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Auto incremental
    allowNull: false, // No nulo
    unique: true, // Valor único
  },
  Cantidad:{
    type: DataTypes.INTEGER, 
    allowNull: false, 
  },
  Unidad:{
    type: DataTypes.STRING(45), 
    allowNull: false, 
  },
}, {
  timestamps: false,
});

export default RecIng;