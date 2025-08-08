import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { getStatByUserId } from "../db/queries/stats.js";
import { respondWithJSON } from "../json.js";

export const handlerGetStat = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);

  const stat = await getStatByUserId(userId);
  if (!stat) {
    throw new Error("couldn't get stat");
  }

  respondWithJSON(res, 200, {
    ...stat,
    level: Math.round(stat.experience! / 1000), // TODO: actual level calculation
  });
};
