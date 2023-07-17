import express from "express";
import * as env from "dotenv";
import dbConnect from "./config/dbConfig.js";
import universityRoutes from "./routes/universityRoute.js";
import multer from "multer";
import { extname } from "path";
import studentRoutes from "./routes/studentRoute.js";

const app=express();

dbConnect();

app.use(express.json()); // for json
app.use(express.urlencoded({
    extended:true
})) // for form data


app.use("/api/university",universityRoutes); // for university
app.use("/api/students",studentRoutes); //for students

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})