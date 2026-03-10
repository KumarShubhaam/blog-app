import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './src/config/database.mongodb.config.js';

dotenv.config()

const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Blog App is running on http://localhost:${process.env.PORT}`)
  connectToMongoDB()
})

export default app;