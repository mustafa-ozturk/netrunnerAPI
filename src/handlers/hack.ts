import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { createHack, getHackById } from "../db/queries/hacks.js";
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

export const handlerGetHackById = async (req: Request, res: Response) => {
  const { hackID } = req.params;
  const token = getBearerToken(req);
  validateJWT(token, config.jwt.secret);

  const hackDetails = await getHackById(hackID);
  if (!hackDetails) {
    throw new Error("Couldnt get hack");
  }

  respondWithJSON(res, 200, {
    id: hackDetails.id,
    userId: hackDetails.userId,
    createdAt: hackDetails.createdAt,
    updatedAt: hackDetails.updatedAt,
    completesAt: hackDetails.completesAt,
    status: hackDetails.status,
  } satisfies NewHack);
};
