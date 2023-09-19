import {Router} from "express";
import { deleteReceta, getRecetaByID, getRecetaByUserID, getRecetas, postReceta, putReceta } from "../controllers/recetasController.js";

const router = Router();

router.get("/", [], getRecetas)

router.get("/:id", [], getRecetaByID)

router.get("/usuario/:idUsuario", [], getRecetaByUserID)

router.post("/", [], postReceta)

router.put("/:id", [], putReceta)

router.delete("/:id", [], deleteReceta)

export default router