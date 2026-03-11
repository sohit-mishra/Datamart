import express from "express";
import * as productController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import productSchema from "../validations/product.validation.js";

const router = express.Router();
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  authMiddleware,
  validateMiddleware(productSchema),
  productController.createProduct
);
router.put(
  "/:id",
  authMiddleware,
  validateMiddleware(productSchema),
  productController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  productController.deleteProduct
);

export default router;