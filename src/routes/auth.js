import {Router} from "express";
import { signIn, login, renewToken } from "../controllers/authController.js";

const router = Router();

router.post("/signin", [], signIn)

router.post("/login", [], login)

router.post("/renewtoken", [], renewToken)


export default router