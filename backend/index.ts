import express from 'express';
import app from './server.js';

import blogRoutes from './src/features/blogs/blogs.routes.js';
import userRoutes from './src/features/users/users.routers.js';

import HandleAppError from './src/middlewares/customError.middleware.js';

import { SignUpBulkUser } from './src/features/sample data/users sample/users.sample.js';
import { createNewBlogs } from './src/features/sample data/blogs sample/blogs.sample.js';


// parse URL encoded data 
app.use(express.urlencoded({extended:true}));
// parse json data
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home page for Blog App')
})

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/comments', blogRoutes)




app.use(HandleAppError);


// TESTS DATA ADDING
// SignUpBulkUser();
// createNewBlogs();