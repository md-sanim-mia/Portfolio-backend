import httpStatus from "http-status-codes";
import { asyncCatch } from "../../utilitys/async.catch";
import { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../utilitys/sendResponse";
import { BlogService } from "./blog.services";

const createBlog = asyncCatch(async (req, res) => {
  const file = req.file;
  const { id } = req.user as JwtPayload;
  if (!file) {
    throw new Error("Image file is required");
  }
  const blogData = { ...req.body, image: file.path };

  const result = await BlogService.createBlogIntoDB(blogData, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlog = asyncCatch(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getBlogById = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getBlogByIdFromDB(id);

  if (!result) {
    throw new Error("Blog not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

//update blog
const updateBlog = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new Error("Image file is required");
  }

  // check user is admin
  const user = req.user as JwtPayload;
  // console.log(user);
  if (user.role !== "admin") {
    throw new Error("You are not authorized to update this blog");
  }
  // check blog exists
  const blog = await BlogService.getBlogByIdFromDB(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  const blogData = {
    ...req.body,
    image: file?.path,
  };

  const result = await BlogService.updateBlogIntoDB(id, blogData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = asyncCatch(async (req, res) => {
  const { id } = req.params;

  // check user is admin
  const user = req.user as JwtPayload;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to delete this blog");
  }

  // check blog exists
  const blog = await BlogService.getBlogByIdFromDB(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  await BlogService.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
