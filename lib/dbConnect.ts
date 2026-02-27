import mongoose from "mongoose";

const MONGO_URL = process.env.URL as string;
let isConnected:boolean = false;

export default async function dbConnect(){

    // is url available 
    if(!MONGO_URL){
        throw new Error('Please define the Database address in server')
    }

    // checking the db Connection 
    if(isConnected){
        console.log("Database is already connected");
        return mongoose;
    }

    // connecting the db 
    try {
        await mongoose.connect(MONGO_URL,{
            dbName:"portfolio"
        });
        console.log("MongoDB is connected")
        isConnected = true;
        return mongoose;
    } catch (error) {
        console.log("Error is DB connection", error)
    }
}