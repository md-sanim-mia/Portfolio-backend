import { JwtPayload } from "jsonwebtoken";
import { asyncCatch } from "../../utilitys/async.catch";
import { authServices } from "./auth.service";

const loging = asyncCatch(async (req, res) => {
  const result = await authServices.logingForDb(req.body);
  res.status(200).json({
    success: true,
    message: "user succes fully loging",
    data: result,
  });
});
const updatedPassword = asyncCatch(async (req, res) => {
  const user = req?.user as JwtPayload;
  const result = await authServices.updatePasswordForDb(req.body, user.email);
  res.status(200).json({
    success: true,
    message: "user succes fully loging",
    data: result,
  });
});

export const authContllors = {
  loging,
  updatedPassword,
};
