const express = require("express");
const app = express();
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/notes",noteRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to simple NotesAPI")
});

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at port no "+PORT);
    });
})
.catch((error)=>{
    console.log(error);
})