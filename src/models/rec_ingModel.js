import { DataTypes } from 'sequelize';
import { sequelize } from '../database/configdb.js';


const RecIng = sequelize.define('receta_ingredientes', {
  idreceta_ingredientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Unidad: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ingrediente_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Esto evita que la clave foránea ingrediente_id sea nula
  },
  receta_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Esto evita que la clave foránea receta_id sea nula
  },
}, {
  timestamps: false,
});

export default RecIng;
