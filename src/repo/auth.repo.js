import Users from "../../database/schemaDB.js";

function user_register(fname, lname, username, pwd){
    const newUser = {
        FirstName: fname,
        LastName: lname,
        Username: username,
        Password: pwd
    }

    Users.create(newUser).then(() => {
        console.log('User registered successfully');      
    }).catch((err) => {
        console.error('Error registering User:', err);
    });
}

export { user_register };