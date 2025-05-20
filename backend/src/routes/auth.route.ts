import { Router } from "express";
import { logout, signUp } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
