import { db } from "../index.js";
import { marketItems, NewMarketItem } from "../schema.js";

export const createMarketItems = async (newMarketItems: NewMarketItem[]) => {
  try {
    const rows = await db
      .insert(marketItems)
      .values(newMarketItems)
      .returning();
    return rows;
  } catch (error: any) {
    console.log("[createMarketItems][DB ERROR]", error?.cause);
  }
};
