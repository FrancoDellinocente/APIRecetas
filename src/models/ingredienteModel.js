import { DataTypes} from 'sequelize';
import {sequelize} from '../database/configdb.js';
import RecIng from './rec_ingModel.js';

const Ingrediente = sequelize.define('ingrediente', {
  idingredientes: {
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

Ingrediente.hasMany(
  RecIng, {
    foreignKey: {
      name: "ingrediente_id",
      allowNull: false,
    },
    sourceKey: "idingredientes",
  }
)

RecIng.belongsTo(
  Ingrediente, {
    foreignKey: {
      name: "ingrediente_id",
      allowNull: false,
    },
    targetId: "idingredientes",
  }
)


export default Ingrediente;