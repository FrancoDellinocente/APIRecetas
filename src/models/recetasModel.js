import { DataTypes} from 'sequelize';
import {sequelize} from '../database/configdb.js';
import RecIng from './rec_ingModel.js';

const Receta = sequelize.define('receta', {
  idreceta: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Auto incremental
    allowNull: false, // No nulo
    unique: true, // Valor único
  },
  Nombre:{
    type: DataTypes.STRING(45), 
    allowNull: false, 
  },
  Descripcion:{
    type: DataTypes.STRING(1000), 
    allowNull: true,
    defaultValue: null, 
  },
}, {
  timestamps: false,
});

Receta.hasMany(
  RecIng, {
    foreignKey: {
      name: "receta_id",
      allowNull: false,
    },
    sourceKey: "idreceta",
  }
)

RecIng.belongsTo(
  Receta, {
    foreignKey: {
      name: "receta_id",
      allowNull: false,
    },
    targetId: "idreceta",
  }
)


export default Receta;