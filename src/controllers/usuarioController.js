import { Router } from 'express';
import Usuario from '../models/usuarioModel.js';
import Receta from '../models/recetasModel.js';

const router = Router();

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: Receta, 
    });

    res.status(200).json({
      status: true,
      msg: 'Usuarios obtenidos',
      totalRegistros: usuarios.length,
      usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al obtener usuarios',
      error: error.message,
    });
  }
};

// Obtener un usuario por ID
export const getUsuarioByID = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      include: Receta,
    });

    if (!usuario) {
      return res.status(204).json({
        status: true,
        msg: 'Usuario no encontrado',
        totalRegistros: 0,
      });
    }

    res.status(200).json({
      status: true,
      msg: 'Usuario obtenido',
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al obtener el usuario',
      error: error.message,
    });
  }
};

// Crear un nuevo usuario
export const postUsuario = async (req, res) => {
  try {
    const { Mail, Contraseña, Nombre, Apellido, ImgPerfil } = req.body;

    const nuevoUsuario = await Usuario.create({
      Mail,
      Contraseña,
      Nombre,
      Apellido,
      ImgPerfil,
    });

    res.status(201).json({
      status: true,
      msg: 'Usuario creado exitosamente',
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al crear el usuario',
      error: error.message,
    });
  }
};

// Actualizar un usuario
export const putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Contraseña, Nombre, Apellido, ImgPerfil } = req.body;

    
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        status: false,
        msg: 'Usuario no encontrado',
      });
    }

    
    usuario.Contraseña = Contraseña;
    usuario.Nombre = Nombre;
    usuario.Apellido = Apellido;
    usuario.ImgPerfil = ImgPerfil;

    await usuario.save();

    res.status(200).json({
      status: true,
      msg: 'Usuario actualizado exitosamente',
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        status: false,
        msg: 'Usuario no encontrado',
      });
    }

    
    await usuario.destroy();

    res.status(200).json({
      status: true,
      msg: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: 'Error al eliminar el usuario',
      error: error.message,
    });
  }
};

export default router;
