import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/me",authMiddleware, authController.getMe);
router.put("/update",authMiddleware, authController.updateUser);

export default router;