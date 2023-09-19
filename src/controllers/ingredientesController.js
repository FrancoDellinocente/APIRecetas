import { Router } from "express";
import Ingrediente from '../models/ingredienteModel.js';

const router = Router();

// Obtener todos los ingredientes
export const getIngredientes = async (req, res) => {
    try {
      const ingredientes = await Ingrediente.findAll();
  
      res.status(200).json({
        status: true,
        msg: 'Ingredientes Obtenidos',
        totalRegistros: ingredientes.length,
        ingredientes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al obtener ingredientes',
        error: error.message,
      });
    }
  };
  
  // Obtener un ingrediente por ID
  export const getIngredientesByID = async (req, res) => {
    try {
      const { id } = req.params;
      const ingrediente = await Ingrediente.findByPk(id);
  
      if (!ingrediente) {
        return res.status(204).json({
          status: true,
          msg: 'Ingrediente no encontrado',
          totalRegistros: 0,
        });
      }
  
      res.status(200).json({
        status: true,
        msg: 'Ingrediente Obtenido',
        totalRegistros: ingrediente.length,
        ingrediente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al obtener el ingrediente',
        error: error.message,
      });
    }
  };

  // Obtener recetas que incluyan un ingrediente específico
export const getRecetasByIngredienteID = async (req, res) => {
  try {
    const { id } = req.params;

    const ingrediente = await Ingrediente.findByPk(id);

    if (!ingrediente) {
      return res.status(404).json({
        status: false,
        msg: 'Ingrediente no encontrado',
      });
    }

    // Utiliza la relación para obtener las recetas que incluyen el ingrediente
    const recetas = await ingrediente.getRecetas();

    res.status(200).json({
      status: true,
      msg: 'Recetas que incluyen el ingrediente',
      totalRecetas: recetas.length,
      recetas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al obtener las recetas del ingrediente',
      error: error.message,
    });
  }
};
