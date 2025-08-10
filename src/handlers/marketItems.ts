import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { createMarketItems } from "../db/queries/marketItems.js";
import { BadRequestError } from "../error.js";
import { respondWithJSON } from "../json.js";

export const handlerAddItemToMarket = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);
  const itemIds = req.body?.itemIds;

  if (!itemIds) {
    throw new BadRequestError("itemIds required");
  }

  const marketItems = await createMarketItems(
    itemIds.map((itemId: string) => {
      return {
        itemId: itemId,
        userId: userId,
      };
    })
  );

  respondWithJSON(res, 201, {
    marketItems: marketItems,
  });
};
