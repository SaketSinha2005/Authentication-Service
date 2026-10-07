import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function authenticateToken(req, res, next) {
    const token = req.cookies['authCookie'];

    if(!token)  return res.status(401).json({message : "Token missing"});
        
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if(err) res.status(403).json({message : 'Invalid or expired token' });

        req.user = decoded;
        next();
    })
}

export default authenticateToken;