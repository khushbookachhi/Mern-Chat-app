import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const mongodbURL=process.env.mongodb_URL;
export const connectUsingMongoose=async()=>{
    try {
        await mongoose.connect(mongodbURL
        //    {
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true
        //    } 
        );  
        console.log("Mongodb is connected using mongoose");
    } catch (error) {
        console.log("mongoose connection error!");
        console.log(error);
    }
    
}