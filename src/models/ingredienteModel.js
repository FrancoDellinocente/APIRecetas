import { DataTypes} from 'sequelize';
import {sequelize} from '../database/configdb.js';


const Ingrediente = sequelize.define('Ingrediente', {
  idIngredientes: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Auto incremental
    allowNull: false, // No nulo
    unique: true, // Valor único
  },
  Nombre: {
    type: DataTypes.STRING(45), // VARCHAR(45)
    allowNull: false, // No nulo
  },
}, {
  timestamps: false,
});

export default Ingrediente;