import express from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

export default router;
