import {Router} from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, adminRoute, getProducts);
router.get("/:id", protectRoute,getProductById);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", deleteProduct);

export default router;