import express from "express";
import { authContllors } from "./auth.contllor";
import auth from "../../middlwares/auth";
const router = express.Router();

router.post("/login", authContllors.loging);
router.patch(
  "/chenge-password",
  auth("user", "admin"),
  authContllors.updatedPassword
);

export const authRouters = router;
