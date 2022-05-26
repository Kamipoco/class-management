import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const signJWT = (user) => {
  const jwtUser = jwt.sign({ payload: user }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRETIME,
  });

  return jwtUser;
};
