import express from "express";
import authenticateToken from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/user/dashboard', authenticateToken, (req, res) => {
    res.json({ 
        message : "Your are at home",
    });
})

export default router;