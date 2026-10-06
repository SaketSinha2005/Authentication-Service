import app from "./src/app.js";
import config from "./src/config/config.js";
import mongoose from "mongoose";


mongoose.connect(config.MONGO_URL).then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);

});

app.listen(config.PORT, () => {
    console.log(`Server is running at ${config.PORT}`);
})