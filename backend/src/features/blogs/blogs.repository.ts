import UserModel from "../users/user.model.js";
import BlogsModel, {type BlogsType, type InputBlogsType } from "./blogs.model.js";


export default class BlogsRepository {
  private projected_properties: string

  constructor(){
    this.projected_properties = 'author title content images'
  }

  // CREATE
  async createNewBlog(blogObj: InputBlogsType) {
    let session;
    try {
      session = await BlogsModel.startSession();
      session.startTransaction();
      let [newBlog] = await BlogsModel.create([blogObj], {session});
      if(!newBlog){
        throw Error('Document Array is empty after creating doc, something went wrong')
      }
      // let newBlog = createdBlog.toObject();
      console.log(newBlog)
      await UserModel.findOneAndUpdate(
        {username: newBlog.author}, 
        {$push: {blogs: newBlog._id}},
        {session}
      );
      await session.commitTransaction()
      return newBlog;
    } 
    catch (error) {
      await session?.abortTransaction();
      console.log('error occured here in catch')
      throw error;
    } 
    finally {
      await session?.endSession();
    }
  }
  
  // READ
  async ReadBlogById(id: string){
    try {
      let blog = await BlogsModel.findById(id, this.projected_properties)
      return blog;
    } catch (error) {
      throw error;
    }
  }

  async ReadBlogByUser(userId: string){
    try {
      let blogs = await UserModel.find({_id: userId}, 'blogs').populate('blogs');
      return blogs;
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  async UpdateBlogTitleOrContent(id: string, blogObj: {title: string, content: string} ) {
    try {
      const { title, content } = blogObj;
      
      let blog = await BlogsModel.findById(id);
      if(!blog){
        throw Error('No blogs found!!');
      }
      blog.title = title;
      blog.content = content;
      await blog.save()
      return blog;
    } 
    catch (error) {
      throw error;
    }
  }

  // DELETE
  async DeleteBlogById(id: string){
    let session;
    try {
      session = await BlogsModel.startSession();
      session.startTransaction()

      // deleted blog
      let deletedBlog = await BlogsModel.findByIdAndDelete(id, {session});
      if (!deletedBlog) {
        throw new Error('Blog not found');
      }

      // deleted blog from user's blogs array
      let user = await UserModel.findByIdAndUpdate(
        {
          _id: deletedBlog?._id
        },
        {
          $pull: { blogs: deletedBlog?._id }
        },
        {session}
      );

      await session.commitTransaction()
      
      return deletedBlog;
    } 
    catch (error) {
      await session?.abortTransaction();
      throw error;      
    }
    finally {
      await session?.endSession();
    }
  }


}