import mongoose from "mongoose";
import * as env from "dotenv";


env.config();

const dbConnect = async ()=>{
    try{
        let url=process.env.MONGO_URL;
        await mongoose.connect(url); // connect to database
        console.log("Mongodb successfully connected");
    }
    catch(err){
        console.log("Mongodb connection failed");
    }
}

export default dbConnect;