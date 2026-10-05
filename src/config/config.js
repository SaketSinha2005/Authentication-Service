import dotenv from "dotenv";
dotenv.config();

if(!process.env.PORT) throw new Error("Backend PORT number not defined in environmental variables");
if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined in environmental variables");

const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;