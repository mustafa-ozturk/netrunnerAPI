import { Request, Response } from "express";
import { BadRequestError, UnAuthorizedError } from "../error.js";
import { getUserByUsername } from "../db/queries/users.js";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "../auth.js";
import { UserResponse } from "./user.js";
import { config } from "../config.js";
import { createRefreshToken } from "../db/queries/refresh.js";
import { respondWithJSON } from "../json.js";

export type LoginResponse = UserResponse & {
  token: string;
  refreshToken: string;
};

export const handlerLogin = async (req: Request, res: Response) => {
  type parameters = {
    username: string;
    password: string;
  };
  let params: parameters = req.body;

  const missingParams: string[] = [];
  if (!params || !params.username) missingParams.push("username");
  if (!params || !params.password) missingParams.push("password");
  if (missingParams.length > 0) {
    throw new BadRequestError(
      `Missing required params: ${missingParams.join(", ")}.`
    );
  }

  const user = await getUserByUsername(params.username);
  if (!user) {
    throw new UnAuthorizedError("Incorrect username or password.");
  }

  const pwIsValid = await checkPasswordHash(
    params.password,
    user.hashedPassword
  );
  if (!pwIsValid) {
    throw new UnAuthorizedError("Incorrect username or password.");
  }

  const accessToken = makeJWT(
    user.id,
    config.jwt.defaultDuration,
    config.jwt.secret
  );
  const refreshToken = makeRefreshToken();
  await createRefreshToken(user.id, refreshToken);

  respondWithJSON(res, 200, {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: accessToken,
    refreshToken: refreshToken,
  } satisfies LoginResponse);
};
