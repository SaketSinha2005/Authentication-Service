import { already_registered, find_user_by_username, user_register, find_user_by_id } from "../repo/auth.repo.js";
import config from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function UserSignup(req, res){
    const saltRounds = 10;

    const val = await already_registered(req.body.email);

    if(val != null){
        res.status(409).json({message: "Email already Registered"});
        return;
    }

    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        await user_register(req.body.fname, req.body.lname, req.body.email, req.body.username, hash);
        res.status(201).json({message : "Registeration Successfull"});
    }
    catch (err){
        console.error(err);
        res.status(400).json({ message: "Registration Unsuccessful" });
    }
}

async function Userlogin(req, res){
    const user = await find_user_by_username(req.body.username);

    if(user === null){
        res.status(401).json({ message: "Invalid Email or Password!" });
        return;
    }

    try{
        const hashedpwd = user.Password;
        const result = await bcrypt.compare(req.body.password, hashedpwd);

        if(result){
            const sessionExpiresAt = Date.now() + config.SESSION_DURATION;

            const accessToken = jwt.sign(
                {userid: user._id, email: user.Email},
                config.ACCESS_JWT_SECRET,
                { expiresIn: '15m' }
            )

            const refreshToken = jwt.sign(
                {userid: user._id, sessionExpiresAt},
                config.REFRESH_JWT_SECRET,
                {expiresIn: '7d'}
            )

            res.cookie('authCookie', refreshToken, {
                httpOnly: true,
                maxAge: 604800,
                sameSite: "lax",
                secure: false         //to make true in https production
            });

            return res.status(200).json({
                message: "Registration Successfull",
                user: {
                    email: user.Email,
                    username: user.Username,
                },
                accessToken
            })
        }
        else{
            res.status(401).json({ message: "Invalid Email or Password!" });
            return;
        }
    }
    catch (err){
        console.error(err);
        res.status(400).json({ message: "Login Unsuccessful" });
    }
    
}

async function RefreshToken(req, res){
    
    const user = await find_user_by_id(req.user.userid);

    const accessToken = jwt.sign(
        {userid: user._id, email: user.Email},
        config.ACCESS_JWT_SECRET,
        { expiresIn: '15m' }
    )

    const remainingTime = req.user.sessionExpiresAt - Date.now();

    const refreshToken = jwt.sign(
        {userid: user._id, sessionExpiredAt: req.user.sessionExpiredAt},
        config.REFRESH_JWT_SECRET,
        {expiresIn: Math.floor(remainingTime / 1000)}
    )

    res.cookie('authCookie', refreshToken, {
        httpOnly: true,
        maxAge: 604800,
        sameSite: "lax",
        secure: false         //to make true in https production
    });

    return res.status(201).json({accessToken});
}

export {UserSignup, Userlogin, RefreshToken};