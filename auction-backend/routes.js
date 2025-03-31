import express from "express";
import { register, login } from "./controllers/authController.js";

const router = express.Router();

// User Authentication Routes
router.post("/signup", register);
router.post("/login", login);

export default router;
