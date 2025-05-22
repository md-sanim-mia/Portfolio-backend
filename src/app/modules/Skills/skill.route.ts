import express, { NextFunction, Request, Response } from "express";

import { SkillsController } from "./skill.controller";
import auth from "../../middlwares/auth";
import { multerUpload } from "../../config/multer-config";

const router = express.Router();
router.post(
  "/",
  auth("admin"),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  SkillsController.addSkill
);
router.get("/", SkillsController.getAllSkill);
router.get("/:id", SkillsController.getSkillById);
router.patch(
  "/:id",
  auth("admin"),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  SkillsController.updateSkill
);

router.delete("/:id", auth("admin"), SkillsController.deleteSkill);

export const SkillsRoutes = router;
