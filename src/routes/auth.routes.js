import express from "express";
import passport from "../config/passport.config.js";
import { UserSignup, Userlogin, RefreshToken, GoogleAuthCallback } from "../controllers/auth.controller.js";
import { authenticateRefreshToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/auth/signup', UserSignup);
router.post('/auth/login', Userlogin);
router.get('/auth/refresh-token', authenticateRefreshToken, RefreshToken);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/api/auth/login' }),
    GoogleAuthCallback
);

export default router;