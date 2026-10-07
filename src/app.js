import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

mongoose.connect(config.MONGO_URL).then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);

});

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRouter);

app.listen(config.PORT, () => {
    console.log(`Server is running at ${config.PORT}`);
})