import { response } from "express";
import Usuario from "../models/usuarioModel.js";
import bcryptjs from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";

export const signIn = async (req, res = response) => {
  try {
    const { Mail, Contraseña, Nombre, Apellido, ImgPerfil } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    let usuario = await Usuario.findOne({ where: { Mail } });

    // Si el usuario ya existe
    if (usuario) {
      return res.status(400).json({
        msg: "El usuario ya existe. Inicia sesión en lugar de registrarte.",
      });
    }

    // Si el usuario no existe, crea una nueva instancia de Usuario
    usuario = Usuario.build({
      Mail,
      Contraseña, 
      Nombre,
      Apellido,
      ImgPerfil,
    });

    // Hashear la contraseña antes de almacenarla en la base de datos
    const salt = await bcryptjs.genSalt(10);
    usuario.Contraseña = await bcryptjs.hash(Contraseña, salt);

    // Guardar el nuevo usuario en la base de datos
    await usuario.save();

    // Generar el JWT (JSON Web Token)
    const token = await generarJWT(usuario.idusuario);

    res.status(201).json({
      status: true,
      msg: "Usuario registrado con éxito",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor al registrar el usuario",
    });
  }
};


export const login = async (req, res = response) => {
  try {
    const { Mail, Contraseña } = req.body;
    // Verificar Email
    const usuario = await Usuario.findOne({ Mail });
    if (!usuario) {
      return res.status(400).json({
        msg: "Email o Contraseña Incorrecto!",
      });
    }

    // Verificar La Contraseña
    const validarContraseña = bcryptjs.compareSync(Contraseña, usuario.Contraseña);
    if (!validarContraseña) {
      return res.status(400).json({
        msg: "Email o Contraseña Incorrecto!",
      });
    }

    // Generar El JWT (JSON Web Token)
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      status: true,
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error De Login, Revisar Credenciales",
    });
  }
};

export const renewToken = async (req, res = response) => {
  try {
    const { id, nombre } = req.usuario;
    const usuario = req.usuario;
    const token = await generarJWT(id);

    res.json({
      ok: true,
      msg: "Token Renewed",
      token,
      id,
      nombre,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
