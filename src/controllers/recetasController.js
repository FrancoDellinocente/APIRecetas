import { Router } from "express";
import Receta from "../models/recetasModel.js";
import RecIng from "../models/rec_ingModel.js";
import { sequelize } from "../database/configdb.js"

const router = Router();

// Obtener todas los recetas
export const getRecetas = async (req, res) => {
    try {
      const recetas = await Receta.findAll();
  
      res.status(200).json({
        status: true,
        msg: 'Recetas Obtenidos',
        totalRegistros: recetas.length,
        recetas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al obtener recetas',
        error: error.message,
      });
    }
  };

  // Obtener un receta por usuario
  export const getRecetaByUserID = async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const recetas = await Receta.findAll({
        where: {
          usuario_id: idUsuario,
        },
      });
  
      if (recetas.length = 0) {
        return res.status(204).json({
          status: true,
          msg: 'Receta no encontradas',
          totalRegistros: 0,
        });
      }
  
      res.status(200).json({
        status: true,
        msg: 'Receta Obtenido',
        totalRegistros: recetas.length,
        recetas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al obtener el Recetas',
        error: error.message,
      });
    }
  };
  
  // Obtener un receta por ID
  export const getRecetaByID = async (req, res) => {
    try {
      const { id } = req.params;
      const recetas = await Receta.findByPk(id);
  
      if (!recetas) {
        return res.status(204).json({
          status: true,
          msg: 'Receta no encontrado',
          totalRegistros: 0,
        });
      }
  
      res.status(200).json({
        status: true,
        msg: 'Receta Obtenida',
        totalRegistros: recetas.length,
        recetas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al obtener la receta',
        error: error.message,
      });
    }
  };

  // Crea receta nueva
  export const postReceta = async (req, res) => {
    const t = await sequelize.transaction(); 
    try {
      const { Nombre, Descripcion, usuario_id, ingredientes } = req.body;

      const nuevaReceta = await Receta.create({
        Nombre,
        Descripcion,
        usuario_id,
      },
      { transaction: t });


      for (const ingrediente of ingredientes) {
        const { idIngrediente, Cantidad, Unidad } = ingrediente;

        await RecIng.create({
          receta_id: nuevaReceta.idreceta,
          ingrediente_id: idIngrediente, 
          Cantidad: Cantidad,
          Unidad: Unidad,
        },
        { transaction: t });
      }

      // Confirma la transacción si todo ha ido bien
      await t.commit();

      res.status(201).json({
        status: true,
        msg: 'Receta creada exitosamente con ingredientes',
        receta: nuevaReceta,
      });
    } catch (error) {
      console.error(error);

      await t.rollback();

      res.status(500).json({
        status: false,
        msg: 'Error al crear la receta con ingredientes',
        error: error.message,
      });
    }
  };


// Actualiza una receta existente
export const putReceta = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    const { id } = req.params; 
    const { Nombre, Descripcion, ingredientes } = req.body; 

    // Verifica si la receta existe
    const receta = await Receta.findByPk(id);

    if (!receta) {
      await t.rollback(); // Deshace la transacción en caso de receta no encontrada
      return res.status(404).json({
        status: false,
        msg: 'Receta no encontrada',
      });
    }
    
    receta.Nombre = Nombre;
    receta.Descripcion = Descripcion;

    await receta.save({ transaction: t });

    // Borra todos los ingredientes relacionados con la receta
    await RecIng.destroy({ where: { receta_id: id }, transaction: t });

    // Itera sobre el array de nuevos ingredientes y crea las instancias en la tabla intermedia dentro de la transacción
    for (const ingrediente of ingredientes) {
      const { idIngrediente, Cantidad, Unidad } = ingrediente;

      await RecIng.create(
        {
          receta_id: id, 
          ingrediente_id: idIngrediente,
          Cantidad: Cantidad,
          Unidad: Unidad,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(200).json({
      status: true,
      msg: 'Receta actualizada exitosamente con ingredientes',
      receta,
    });
  } catch (error) {
    console.error(error);

    await t.rollback();

    res.status(500).json({
      status: false,
      msg: 'Error al actualizar la receta con ingredientes',
      error: error.message,
    });
  }
};
