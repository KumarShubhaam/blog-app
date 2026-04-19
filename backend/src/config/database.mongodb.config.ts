import mongoose, { type ConnectOptions } from "mongoose";
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


async function connectToMongoDBAtlas() {
  const db_username = encodeURIComponent(process.env.DB_USERNAME || "");
  const db_password = encodeURIComponent(process.env.DB_PASSWORD || "");
  const dbUrl = `mongodb+srv://${db_username}:${db_password}@blogapp.xwlc8i6.mongodb.net/?appName=BlogApp`
  const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  try {
    await mongoose.connect(dbUrl, clientOptions);
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(`Database connection failed with error: ${error}`);
  }
}



export {
  connectToMongoDB,
  connectToMongoDBAtlas
};