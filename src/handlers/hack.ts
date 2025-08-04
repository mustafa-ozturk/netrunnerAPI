import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { createHack } from "../db/queries/hacks.js";
import { NewHack } from "../db/schema.js";
import { respondWithJSON } from "../json.js";

export const handlerStartHack = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userID = validateJWT(token, config.jwt.secret);

  const hackDetails = await createHack(userID);
  if (!hackDetails) {
    throw new Error("Couldn't start hack");
  }

  respondWithJSON(res, 201, {
    id: hackDetails.id,
    userId: hackDetails.userId,
    createdAt: hackDetails.createdAt,
    updatedAt: hackDetails.updatedAt,
    completesAt: hackDetails.completesAt,
    status: hackDetails.status,
  } satisfies NewHack);
};
