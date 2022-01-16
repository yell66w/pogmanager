import { Router } from "express";
import AuthController from "../controllers/AuthController";
const router = Router();
import passport from "passport";
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  AuthController.profile
);

export default router;
