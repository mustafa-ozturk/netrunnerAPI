import { Request, Response } from "express";
import { createUser } from "../db/queries/users.js";
import { NewUser } from "../db/schema.js";
import { BadRequestError } from "../error.js";
import { respondWithJSON } from "../json.js";
import { hashPassword } from "../auth.js";
import { createNewStat } from "src/db/queries/stats.js";

export type UserResponse = Omit<NewUser, "hashedPassword">;

export const handlerCreateUser = async (req: Request, res: Response) => {
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

  const hashedPassword = await hashPassword(params.password);

  const user = await createUser({
    username: params.username,
    hashedPassword: hashedPassword,
  });

  // create the users stats
  await createNewStat(user.id);

  respondWithJSON(res, 201, {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } satisfies UserResponse);
};

// TODO: handle database errors, don't fail silently
