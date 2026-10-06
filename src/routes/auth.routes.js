import express from "express";
import bcrypt from "bcrypt";
import {already_registered, user_register} from "../repo/auth.repo.js"
import fs from "fs";

const router = express.Router();

router.post('/auth/signup', async (req, res) => {
    const saltRounds = 10;

    const val = await already_registered(req.body.email);

    if(await val.length > 0){
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
})

router.post('/auth/login', (req, res) => {
    const path = "./database/users.json";

    fs.readFile(path, 'utf-8', (err, rawdata) => {
        if (err) { console.error(err); return res.status(500).send("Server error"); }

        const users = JSON.parse(rawdata);
        const user_registered = users.find(user => user.username === req.body.username);

        if(user_registered) {
            const hashedpwd = user_registered.password;

            bcrypt.compare(req.body.password, String(hashedpwd), (err, result) => {
                if (err) { console.log(`Error occured !: ${err}`); return res.status(500).send("Server error"); }
                // console.log(result);
                if(result) return res.send("Login Successfull");
                else return res.send("Invalid Credentials");
            })
            return;
        }

        return res.send("Username doesnot exist");
    })
})

export default router;