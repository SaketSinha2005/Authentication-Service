import Users from "../models/user.model.js";

async function already_registered(email){
    try {
        const user_find = await Users.findOne({Email: email});
        return user_find;
    }
    catch (err){
        console.error(err);
        throw err;
    }
}

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

async function find_user_by_username(username){
    try{
        const user = await Users.findOne({Username: username});
        return user;
    }
    catch (err){
        console.error(err);
        throw err;
    }
}

async function find_user_by_id(id){
    try{
        const user = await Users.findOne({_id: id});
        return user;
    }
    catch (err){
        console.error(err);
        throw err;
    }
}

async function find_user_by_google_id(googleId){
    try{
        const user = await Users.findOne({googleId: googleId});
        return user;
    }
    catch (err){
        console.error("Error finding user by Google ID:", err);
        throw err;
    }
}

async function find_or_create_google_user(profile){
    try{
        let user = await Users.findOne({ googleId: profile.id });
        if(user){
            return user;
        }

        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        if(email){
            user = await Users.findOne({ Email: email });
            if(user){
                user.googleId = profile.id;
                await user.save();
                return user;
            }
        }

        const firstName = profile.name?.givenName || profile.displayName || "User";
        const lastName = profile.name?.familyName || "";
        const username = email ? email.split("@")[0] : `google_${profile.id}`;

        const newUser = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Username: username,
            googleId: profile.id,
            Password: ""
        };

        user = await Users.create(newUser);
        return user;
    }
    catch (err){
        console.error("Error in find_or_create_google_user:", err);
        throw err;
    }
}

export { 
    already_registered, 
    user_register, 
    find_user_by_username, 
    find_user_by_id, 
    find_user_by_google_id, 
    find_or_create_google_user 
};