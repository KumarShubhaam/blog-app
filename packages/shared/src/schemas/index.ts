import { z } from "zod";

// ============ User Schemas ============

export const NameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

export const GenderEnum = z.enum(["Male", "Female", "Other"]);

export const UserSchema = z.object({
  name: NameSchema,
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  gender: GenderEnum,
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*@!#$%])[A-Za-z0-9*@!#$%]{6,}$/, { message: "Password should contain at least 6 letters and one capital letter, one digit, and one symbol [*@!#$%]" }),
  blogs: z.array(z.string()).optional(), // ObjectId as string
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Schema for user registration (without blogs and timestamps)
export const UserInputSchema = UserSchema.omit({
  blogs: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for user login
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Schema for updating user profile
export const UpdateUserSchema = UserInputSchema.partial();

// ============ Blog Schemas ============

export const BlogSchema = z.object({
  _id: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.any()).optional(), // Buffer type
  comments: z.string().optional(), // ObjectId as string
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Schema for creating/updating a blog
export const BlogInputSchema = BlogSchema.omit({
  comments: true,
  images: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a blog (all fields optional)
export const UpdateBlogSchema = BlogInputSchema.partial();

// ============ Comment Schemas ============

export const CommentSchema = z.object({
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Comment content is required"),
  blogId: z.string().min(1, "Blog ID is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CommentInputSchema = CommentSchema.omit({
  createdAt: true,
  updatedAt: true,
});

// ============ API Response Schemas ============

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: dataSchema.optional(),
    error: z.string().optional(),
  });

export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  total: z.number().int().nonnegative().optional(),
});

// ============ Type Exports ============

export type Name = z.infer<typeof NameSchema>;
export type Gender = z.infer<typeof GenderEnum>;
export type User = z.infer<typeof UserSchema>;
export type UserInput = z.infer<typeof UserInputSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export type Blog = z.infer<typeof BlogSchema>;
export type BlogInput = z.infer<typeof BlogInputSchema>;
export type UpdateBlog = z.infer<typeof UpdateBlogSchema>;

export type Comment = z.infer<typeof CommentSchema>;
export type CommentInput = z.infer<typeof CommentInputSchema>;

export type Pagination = z.infer<typeof PaginationSchema>;
