import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB, connectToMongoDBAtlas } from './src/config/database.mongodb.config.js';

dotenv.config()

const app = express()

app.listen(process.env.PORT, (err) => {
  if(err) {
    console.log('App has error:', err);
  }
  console.log(`Blog App is running on http://localhost:${process.env.PORT}`)
  connectToMongoDB();
  // connectToMongoDBAtlas().catch(console.dir);
})

export default app;