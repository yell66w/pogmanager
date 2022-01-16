import { Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/login", AuthController.login);

export default router;
