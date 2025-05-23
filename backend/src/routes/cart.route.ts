import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { addToCart, deleteAllFromCart, getCartProducts, updateQuantity } from "../controllers/cart.controller.js";

const router =  Router();

router.get("/", protectRoute, getCartProducts)
router.post("/", protectRoute, addToCart);
router.put("/:id", protectRoute, updateQuantity)
router.delete("/", protectRoute, deleteAllFromCart)

export default router;