import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema (
    {
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Username: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
    },

    {timestamps: true}
);

const Users = mongoose.model('Users', UsersSchema);

export default Users;