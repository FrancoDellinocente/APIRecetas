import Ingrediente from './ingredienteModel.js'; 
import Receta from './recetasModel.js'; 
import RecIng from './rec_ingModel.js'; ;

Ingrediente.belongsToMany(Receta, {
  through: RecIng,
  foreignKey: 'ingrediente_id',
});

Receta.belongsToMany(Ingrediente, {
  through: RecIng,
  foreignKey: 'receta_id',
});

Receta.hasMany(RecIng, {
  foreignKey: 'receta_id',
});

Ingrediente.hasMany(RecIng, {
  foreignKey: 'ingrediente_id',
});
