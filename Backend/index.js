const express = require("express");
const { connection } = require("./connection");
const { userRouter } = require("./Routes/userRouter");
const  jwt = require("jsonwebtoken");
const {authorization} = require("./Authorization");
const { notesRouter } = require("./Routes/notesRouter");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(cors())

app.use(express.json());

app.use("/users", userRouter);

app.use(authorization);

app.use("/notes", notesRouter);


app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("connected to database");
        console.log(`listening to ${process.env.port}  server`);
    } catch (error) {
        console.log("Error with connection", error);
    }
});