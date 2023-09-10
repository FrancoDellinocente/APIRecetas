import {Router} from "express";
import {getIngredientes, getIngredientesByID} from "../controllers/ingredientesController.js"

const router = Router();

router.get("/", [], getIngredientes)

router.get("/:id", [], getIngredientesByID)



export default router