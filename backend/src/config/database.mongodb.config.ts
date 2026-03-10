import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config()

async function connectToMongoDB(){
  const dbUrl = `mongodb://${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  try {
    await mongoose.connect(dbUrl)
    console.log(`Connected to MongoDb instance: ${process.env.DB_SERVER}:${process.env.DB_PORT}`)
  } catch (error) {
    console.log(`Database connection failed with error: ${error}`)
  }
}

export {
  connectToMongoDB
};