import { already_registered, find_user_by_username, user_register } from "../repo/auth.repo.js";
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
            const token = jwt.sign(
                {userid: user._id, email: user.Email},
                config.JWT_SECRET,
                { expiresIn: '1d' }
            )

            res.cookie('authCookie', token, {
                httpOnly: true,
                maxAge: 86400,
                sameSite: "lax",
                secure: false         //to make true in https production
            });

            return res.status(200).json({
                message: "Registration Successfull",
                user: {
                    email: user.Email,
                    username: user.Username,
                }
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

export {UserSignup, Userlogin};