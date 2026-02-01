import { Router } from "express";
import { signUpHandler } from "../controllers/auth.controller.js";

const authRoutes = Router();

// prefix: /auth

authRoutes.post("/signup", signUpHandler);

export default authRoutes;
