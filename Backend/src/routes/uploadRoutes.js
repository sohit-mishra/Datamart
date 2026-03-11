import express from "express";
import * as uploadController from "../controllers/upload.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/me",
  upload.single("image"),
  uploadController.profileImageUpdate
);


export default router;