import {Router} from "express";
import {getDefault} from "../controllers/defaultController.js"

const router = Router();

router.get("/", [], getDefault)

export default router