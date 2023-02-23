import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/user-route.js";
import postRouter from "./routes/post-route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
//?Middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(`/user`, usersRouter);
app.use(`/posts`, postRouter);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))).catch((error) => console.log(error.message));
