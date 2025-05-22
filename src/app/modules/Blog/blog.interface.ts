import { Schema } from "mongoose";

export type TBlog = {
  title: String;
  description: String;
  image?: String;
  authorId?: Schema.Types.ObjectId;
};
