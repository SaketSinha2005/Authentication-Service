import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function authenticateToken(req, res, next) {
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.slice(0, 6) === "Bearer"){
        //to solve 1
        return res.status(401).json({message: "Token missing"});
    }
    const token = authheader.split(" ")[1];

    jwt.verify(token,  config.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
    })


    next();
}

export default authenticateToken;