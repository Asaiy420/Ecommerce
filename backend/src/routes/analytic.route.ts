import {Router} from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
const router = Router()


router.get("/", protectRoute, adminRoute, getAnalytics)


export default router;