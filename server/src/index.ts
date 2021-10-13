// @ts-nocheck
import dotenv from "dotenv";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import * as routes from "./routes";

dotenv.config();

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_NAME || 'everydayFitDB';

mongoose
  .connect(`${mongoURL}/${dbName}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB: ', err));

const port = process.env.SERVER_PORT;
const app = express();

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Configure routes
routes.register(app);

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
