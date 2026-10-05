import express from "express";
import bcrypt from "bcrypt";
import fs from "fs";

const router = express.Router();

router.post('/auth/signup', (req, res) => {

    const path = "./database/users.json";
    let lst_id = 0;
    const saltRounds = 10

    fs.readFile(path, 'utf-8', (err, rawdata) => {
        if(err) console.log("Error opening the file");

        const users = JSON.parse(rawdata);
        if(users.length > 0) lst_id = users[users.length-1].id;

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if(err) console.error(err);

            const newUser = {
                'id': lst_id+1,
                'username': req.body.username,
                'password': hash
            }

            users.push(newUser);

            fs.writeFile(path, JSON.stringify(users, null, 2), (err) => {
                if(err) console.error(err);
                res.send("Signup Successful");
                return;
            });
        })
    })
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