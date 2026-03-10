import mongoose, { Schema } from "mongoose";

interface BlogType {
  id: string
}

const BlogsSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    type: Schema.Types.Buffer
  }],
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }
},
{
  timestamps: true
}
);

const BlogsModel = mongoose.model('blogs', BlogsSchema);

export type BlogsType = mongoose.InferSchemaType<typeof BlogsSchema>;
// export type BlogsType = mongoose.InferRawDocType<typeof BlogsSchema>;

export type InputBlogsType = Omit<BlogsType, 'comments' | 'images' | 'createdAt' | 'updatedAt'>;

export default BlogsModel;