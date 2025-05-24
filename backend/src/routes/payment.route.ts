import {Router} from "express";
import { checkSuccess, createCheckOutSession } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/create-checkout-session", protectRoute, createCheckOutSession)
router.post("/checkout-success", protectRoute, checkSuccess)

export default router;