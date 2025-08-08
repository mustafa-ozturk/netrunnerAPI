import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { TARGETS } from "../gamedata.js";
import { respondWithJSON } from "../json.js";

export const handlerScan = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  validateJWT(token, config.jwt.secret);

  const response = {
    targets: Object.values(TARGETS),
  };

  respondWithJSON(res, 200, response);
};
