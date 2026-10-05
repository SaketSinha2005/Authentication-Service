import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/auth/signup', (req, res) => {
    // const res_input = Object.entries(req.body).map(([key, value]) => {
    //     return `${key}: ${value}`;
    // })

    // res.send(res_input.join('\n'));

    
})

export default router;