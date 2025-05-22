import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog, authorId: string) => {
  const modifiyData = { ...payload, authorId: authorId };
  const result = await Blog.create(modifiyData);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find({});
  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

// update blog into db
const updateBlogIntoDB = async (id: string, data: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete blog into db
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
