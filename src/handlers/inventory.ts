import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import { getItemsByUserId } from "../db/queries/items.js";
import { respondWithJSON } from "../json.js";

export type InventoryItem = {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
};

export const handlerGetInventory = async (req: Request, res: Response) => {
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);

  const items = await getItemsByUserId(userId);
  if (!items) {
    throw new Error("couldn't get items");
  }

  const inventory: InventoryItem[] = items.map((item) => ({
    id: item.id,
    name: item.itemName,
    type: item.itemType,
    description: item.description,
    quantity: item.quantity,
  }));

  respondWithJSON(res, 200, {
    items: inventory,
  });
};
