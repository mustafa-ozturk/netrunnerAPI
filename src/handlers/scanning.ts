import { Request, Response } from "express";
import { respondWithJSON } from "../json.js";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { startUserScanTask } from "../jobs/scanJob.js";

export const handleInitiateScan = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);

  startUserScanTask(userId);

  respondWithJSON(res, 200, {
    message: "Network scan initiated.",
  });
};
