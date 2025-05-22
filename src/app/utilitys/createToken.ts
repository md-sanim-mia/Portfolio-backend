import jwt from "jsonwebtoken";
const CreateToken = (
  jwtPayload: { email: string; role: string },
  scrict: string
) => {
  return jwt.sign(jwtPayload, scrict, { expiresIn: "3d" });
};

export default CreateToken;
