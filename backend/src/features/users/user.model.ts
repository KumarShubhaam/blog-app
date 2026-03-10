import mongoose, { Schema, type InferSchemaType } from "mongoose";

const NameSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    }
  }
)

const UserSchema = new mongoose.Schema({
  name: {
    type: NameSchema,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  gender: {
    type: String,
    trim: true,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'blogs'
    }
  ]
},
  {
    timestamps: true
  }
)

let UserModel = mongoose.model('Users', UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;
export type UserInput = Omit<UserType, 'createdAt' | 'updatedAt' | 'blogs'>;

export default UserModel;