import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { createMarketItems } from "../db/queries/marketItems.js";
import { BadRequestError } from "../error.js";
import { respondWithJSON } from "../json.js";
import { getItemsByUserId } from "../db/queries/items.js";

export const handlerAddItemToMarket = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);
  const itemIds = req.body?.itemIds;

  if (!itemIds) {
    throw new BadRequestError("itemIds required");
  }

  // check if items owned by user
  const userOwnedItems = await getItemsByUserId(userId);
  if (!userOwnedItems) {
    throw new Error("couldn't get items");
  }
  const userOwnedItemIds = userOwnedItems.map((item) => item.id);

  const allItemsSoldOwnedByUser = itemIds.every((itemId: string) =>
    userOwnedItemIds.includes(itemId)
  );

  if (!allItemsSoldOwnedByUser) {
    throw new BadRequestError("Found items not owned by the user.");
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
