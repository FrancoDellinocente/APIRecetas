import {Router} from "express";
import { deleteUsuario, getUsuarioByID, getUsuarios, postUsuario, putUsuario } from "../controllers/usuarioController.js";

const router = Router();

router.get("/", [], getUsuarios)

router.get("/:id", [], getUsuarioByID)

router.post("/", [], postUsuario)

router.put("/:id", [], putUsuario)

router.delete("/:id", [], deleteUsuario)


export default router