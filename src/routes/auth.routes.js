import express from "express";
import { UserSignup, Userlogin, RefreshToken } from "../controllers/auth.controller.js";
import { authenticateRefreshToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/auth/signup', UserSignup);
router.post('/auth/login', Userlogin);
router.get('/auth/refresh-token', authenticateRefreshToken,RefreshToken);

export default router;