import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';
import BlogController from "./blogs.controller.js";

const blogRoutes = Router()

const controller = new BlogController();

// get all blogs for user
blogRoutes.get('/blogs/:userId', (req: Request, res: Response, next: NextFunction) => {
  controller.getAllBlogsForUser(req, res, next);
});

// get a single blog
blogRoutes.get('/:blogId', (req: Request, res: Response, next: NextFunction) => {
  controller.getBlogById(req, res, next);
});

// write a new blog
blogRoutes.post('/:userId/new-story', (req: Request, res: Response, next: NextFunction) => {
  controller.addNewBlog(req, res, next);
});

// update a blog
blogRoutes.put('/:blogId', (req: Request, res: Response, next: NextFunction) => {
  controller.updateBlogById(req, res, next);
});


// delete a blog
blogRoutes.delete('/:blogId', (req: Request, res: Response, next: NextFunction) => {
  controller.deleteBlog(req, res, next);
});


export default blogRoutes;