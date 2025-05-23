import {Router} from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getFeaturedProducts, getRecomendations, getProductsByCategory, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, adminRoute, getProducts);
router.get("/:id", protectRoute,getProductById);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/featured", getFeaturedProducts)
router.get("/recommendations", protectRoute, getRecomendations)
router.get("/category/:category", protectRoute, getProductsByCategory)
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)
export default router;