import express, { NextFunction, Request, Response } from "express";
import { ProjectController } from "./project.controller";
import auth from "../../middlwares/auth";
import { multerUpload } from "../../config/multer-config";
const router = express.Router();
router.post(
  "/",
  auth("admin"),
  multerUpload.fields([{ name: "images" }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    next();
  },
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.patch(
  "/:id",

  auth("admin"),
  multerUpload.fields([{ name: "images" }]),
  (req: Request, res: Response, next: NextFunction) => {
    
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProjectController.updateProject
);

router.delete("/:id", auth("admin"), ProjectController.deleteProject);

export const ProjectRoutes = router;
