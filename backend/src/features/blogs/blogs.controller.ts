import type { Request, Response, NextFunction } from "express";
import BlogsRepository from "./blogs.repository.js";
import { AppError } from "../../middlewares/customError.middleware.js";


export default class BlogController {
  private repository: BlogsRepository
  constructor(){
    this.repository = new BlogsRepository()
  }

  async getAllBlogsForUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if(typeof userId !== 'string'){
        throw new AppError(403, `Wrong type for userId, expected string, got ${typeof userId}`)
      }
      let blogs = await this.repository.ReadBlogByUser(userId);
      if(blogs == null || blogs == undefined){
        throw new AppError(400, `No blogs found`)
      }
      return res.status(200).send({msg:'Successful', blogs: blogs});
    } catch (error) {
      next(error);
    }
  }

  async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;
      if(typeof blogId !== 'string'){
        throw new AppError(403, `Wrong type for userId, expected string, got ${typeof blogId}`)
      }
      let blog = await this.repository.ReadBlogById(blogId);
      if(blog){
        return res.status(200).send({msg:'successful', blog: blog})
      }else{
        return res.status(404).send({msg: `No blog found with the ID ${blogId}`, blog: null})
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addNewBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, title, content } = req.body;
      let newBlog = await this.repository.createNewBlog({author, title, content})
      return res.status(201).send({msg:`New Blog Added`, blog: newBlog})
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, author } = req.body;
      const { blogId } = req.params;
      if(typeof blogId !== 'string'){
        throw new AppError(403, `Wrong type for userId, expected string, got ${typeof blogId}`)
      }
      let updatedBlog = await this.repository.UpdateBlogTitleOrContent(blogId, {title, content});
      return res.status(201).send({msg:`updated blog successfully`, blog:updatedBlog})
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try{
      const { blogId } = req.params;
      if(typeof blogId !== 'string'){
        throw new AppError(403, `Wrong type for userId, expected string, got ${typeof blogId}`)
      }
      let deletedBlog = await this.repository.DeleteBlogById(blogId);
      return res.status(201).send({msg: 'Successfully deleted blog', deletedBlog})
    }
    catch (error){
      console.log(error);
      next(error);
    }
  }


}