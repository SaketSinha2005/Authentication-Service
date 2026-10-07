import express from "express";
import { UserSignup, Userlogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/auth/signup', UserSignup);
router.post('/auth/login', Userlogin);

export default router;