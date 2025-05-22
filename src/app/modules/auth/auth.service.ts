import { StatusCodes } from "http-status-codes";
import { AppError } from "../../Error/AppError";
import { TLoging, TPassword } from "./auth.interface";
import bcrypt from "bcrypt";
import CreateToken from "../../utilitys/createToken";
import config from "../../config/config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./auth.model";
const logingForDb = async (paylood: TLoging) => {
  const isExistUser = await User.findOne({ email: paylood.email });
  if (!isExistUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "user is not found ");
  }

  const passwordMetch = await bcrypt.compare(
    paylood.password,
    isExistUser.password
  );
  console.log(isExistUser);
  if (!passwordMetch) {
    throw new AppError(StatusCodes.BAD_REQUEST, "password das not metch");
  }

  const jwtPayload = {
    email: isExistUser?.email,
    role: isExistUser?.role,
    id: isExistUser._id,
  };
  const accessToken = CreateToken(jwtPayload, config.scrict_key as string);

  return { accessToken };
};
//--------------user upddated her password ------------
const updatePasswordForDb = async (paylood: TPassword, email: string) => {
  const isExistUser = await User.findOne({ email: email });
  if (!isExistUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "user is not found ");
  }

  const passwordMetch = await bcrypt.compare(
    paylood.oldpassword,
    isExistUser.password
  );
  if (!passwordMetch) {
    throw new AppError(StatusCodes.BAD_REQUEST, "password das not metch");
  }

  const hasPassword = await bcrypt.hash(paylood.newpassword, 10);
  if (!hasPassword) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "bcrypt solt generate problem !"
    );
  }

  const result = await User.updateOne(
    { email: email },
    { password: hasPassword },
    { runValidators: true }
  ).select("-password");
  return result;
};
export const authServices = {
  logingForDb,
  updatePasswordForDb,
};
