import {Router} from "express";
import {getIngredientes, getIngredientesByID, getRecetasByIngredienteID} from "../controllers/ingredientesController.js"

const router = Router();

router.get("/", [], getIngredientes)

router.get("/:id", [], getIngredientesByID)

router.get('/:id/recetas', getRecetasByIngredienteID);



export default router