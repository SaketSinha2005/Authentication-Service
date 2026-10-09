import dotenv from "dotenv";
dotenv.config();

if(!process.env.PORT) throw new Error("Backend PORT number not defined in environmental variables");
if(!process.env.ACCESS_JWT_SECRET) throw new Error("ACCESS_JWT_SECRET is not defined in environmental variables");
if(!process.env.REFRESH_JWT_SECRET) throw new Error("REFRESH_JWT_SECRET is not defined in environmental variables");
if(!process.env.SESSION_DURATION) throw new Error("SESSION_DURATION is not defined in environmental variables");
if(!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined in environmental variables");

const config = {
    PORT: process.env.PORT,
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
    SESSION_DURATION: process.env.SESSION_DURATION,
    MONGO_URL: process.env.MONGO_URL
}

export default config;