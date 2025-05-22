import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export const Blog = model<TBlog>("Blog", blogSchema);
