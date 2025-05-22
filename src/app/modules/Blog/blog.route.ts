import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlwares/auth";
import { multerUpload } from "../../config/multer-config";
import { BlogController } from "./Blog.controller";
const router = express.Router();
router.post(
  "/",
  auth("admin"),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogController.createBlog
);

router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getBlogById);
router.patch("/:id", auth("admin"), BlogController.updateBlog);
router.delete("/:id", auth("admin"), BlogController.deleteBlog);

export const blogRouter = router;
