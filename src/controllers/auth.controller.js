import { already_registered, find_user_by_username, user_register } from "../repo/auth.repo.js";
import bcrypt from "bcrypt";

async function UserSignup(req, res){
    const saltRounds = 10;

    const val = await already_registered(req.body.email);

    if(val != null){
        res.status(409).send("Email already Registered");
        return;
    }

    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        await user_register(req.body.fname, req.body.lname, req.body.email, req.body.username, hash);
        res.status(201).send("Registeration Successfull");
    }
    catch (err){
        console.error(err);
        res.status(400).send("Registration Unsuccessful");
    }
}

async function Userlogin(req, res){
    const user = await find_user_by_username(req.body.username);

    if(user === null){
        res.status(401).send("Invalid Email or Password!");
        return;
    }

    try{
        const hashedpwd = user.Password;
        const result = await bcrypt.compare(req.body.password, hashedpwd);

        if(result){
            res.status(200).send("Login Successfull");
            return;
        }
        else{
            res.status(401).send("Invalid Email or Password!");
            return;
        }
    }
    catch (err){
        console.error(err);
        res.status(400).send("Login Unsuccessful");
    }
    
}

export {UserSignup, Userlogin};