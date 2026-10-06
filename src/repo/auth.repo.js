import Users from "../../database/schemaDB.js";

async function user_register(fname, lname, email, username, pwd){
    const newUser = {
        FirstName: fname,
        LastName: lname,
        Email: email,
        Username: username,
        Password: pwd
    }

    try {
        const user = await Users.create(newUser);
        return user;
    }
    catch (err) {
        console.error("Error registering User:", err);
        throw err;
    }
}

export { user_register };