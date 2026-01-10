import jwt, { JwtPayload } from "jsonwebtoken";
export const verifyJwt = (token: string, secretKey: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("You are not Authorize");
  }
};
