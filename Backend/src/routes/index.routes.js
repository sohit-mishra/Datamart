import express from "express";
import productRoutes from "./product.routes.js";
import healthRoutes from "./health.routes.js";
import authRoutes from './auth.routes.js'
import uploadRoutes from './uploadRoutes.js'

const router = express.Router();

router.use("/products", productRoutes);
router.use("/health", healthRoutes);
router.use('/auth',authRoutes )
router.use('/upload', uploadRoutes)

export default router;