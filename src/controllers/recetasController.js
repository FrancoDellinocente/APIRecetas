import { Router } from "express";
import Ingrediente from '../models/ingredienteModel.js';

const router = Router();

// Obtener todas los recetas
export const getRecetas = async (req, res) => {
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
  export const getRecetaByID = async (req, res) => {
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
        totalRegistros: 1,
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

  export const postRecetas = async (req, res) => {
    try {
      const { Nombre } = req.body;
  
      const nuevoIngrediente = await Ingrediente.create({
        Nombre,
      });
  
      res.status(201).json({
        status: true,
        msg: 'Ingrediente creado exitosamente',
        ingrediente: nuevoIngrediente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al crear el ingrediente',
        error: error.message,
      });
    }
  };

  // Actualizar Recetas 
export const putRecetas = async (req, res) => {
    try {
      const { id } = req.params;
      const { Nombre } = req.body;
  
      // Verifica si el Recetas existe
      const ingrediente = await Ingrediente.findByPk(id);
  
      if (!ingrediente) {
        return res.status(404).json({
          status: false,
          msg: 'Ingrediente no encontrado',
        });
      }
  
      // Actualiza
      ingrediente.Nombre = Nombre;
      await ingrediente.save();
  
      res.status(200).json({
        status: true,
        msg: 'Ingrediente actualizado exitosamente',
        ingrediente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        msg: 'Error al actualizar el recetas',
        error: error.message,
      });
    }
  };