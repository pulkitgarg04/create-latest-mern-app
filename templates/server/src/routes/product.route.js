import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getProducts);
router.get("/:id", protectRoute, getProduct);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
