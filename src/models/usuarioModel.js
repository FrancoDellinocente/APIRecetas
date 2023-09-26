import { DataTypes} from 'sequelize';
import {sequelize} from '../database/configdb.js';
import Receta from './recetasModel.js';


const Usuario = sequelize.define('usuario', {
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Auto incremental
    allowNull: false, // No nulo
    unique: true, // Valor único
  },
  Mail: {
    type: DataTypes.STRING(45), // VARCHAR(45)
    allowNull: false, // No nulo
  },
  Contraseña:{
    type: DataTypes.STRING(100), 
    allowNull: false, 
  },
  Nombre:{
    type: DataTypes.STRING(45), 
    allowNull: false, 
  },
  Apellido:{
    type: DataTypes.STRING(45), 
    allowNull: false, 
  },
  ImgPerfil:{
    type: DataTypes.STRING(45), 
    allowNull: true,
    defaultValue: null,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

Usuario.hasMany(
  Receta, {
    foreignKey: {
      name: "usuario_id",
      allowNull: false, 
    },
    sourceKey: "idusuario",
  }
)

Receta.belongsTo(
  Usuario, {
    foreignKey: {
      name: "usuario_id",
      allowNull: false,
    },
    targetId: "idusuario",
  }
)

export default Usuario;