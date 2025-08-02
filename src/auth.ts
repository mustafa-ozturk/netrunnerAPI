import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPasswordHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

const TOKEN_ISSUER = "netrunnerAPI";

export const makeJWT = (
  userID: string,
  expiresInSeconds: number,
  secret: string
) => {
  const issuedAtInSeconds = Math.floor(Date.now() / 1000);
  const expiresAtInSeconds = issuedAtInSeconds + expiresInSeconds;
  const token = jwt.sign(
    {
      iss: TOKEN_ISSUER, // issuer
      sub: userID, // subject
      iat: issuedAtInSeconds, // issued at
      exp: expiresAtInSeconds, // expires in
    } satisfies payload,
    secret,
    { algorithm: "HS256" }
  );
  return token;
};
