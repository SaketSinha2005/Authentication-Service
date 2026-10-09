import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function authenticateToken(req, res, next){
    const authheader = req.headers.authorization;

    if(!authheader || authheader.slice(0, 7) != "Bearer "){
        return res.status(401).json({message : "Token missing"});
    }

    const token = authheader.split(" ")[1];

    jwt.verify(token, config.ACCESS_JWT_SECRET, (err, decoded) => {
        if(err){
        return res.status(403).json({
            message : 'Invalid or expired token'
        })
    }

    req.user = decoded;

    next();
    });
}

async function authenticateRefreshToken(req, res, next) {
    const token = req.cookies['authCookie'];

    if(!token)  return res.status(401).json({message : "Token missing"});
        
    jwt.verify(token, config.REFRESH_JWT_SECRET, (err, decoded) => {
        if(err) res.status(403).json({message : 'Invalid or expired token' });

        if(Date.now() > decoded.sessionExpiredAt){
            return res.status(401).json({
                "message": "Session expired"
            });
        }

        req.user = decoded;
        next();
    })
}

export { authenticateToken, authenticateRefreshToken};