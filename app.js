import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {router} from "./routers/userRoutes.js";
import {uri, port} from "./config/env.js"


const app = express()

app.use(bodyParser.json())
app.use("/users", router)

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


app.listen(port, () => console.log('Server started'));