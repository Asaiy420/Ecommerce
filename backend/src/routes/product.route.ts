import {Router} from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getFeaturedProducts } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, adminRoute, getProducts);
router.get("/:id", protectRoute,getProductById);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/featured", getFeaturedProducts)
export default router;