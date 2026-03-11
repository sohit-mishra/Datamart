import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Server running"
  });
});

export default router;