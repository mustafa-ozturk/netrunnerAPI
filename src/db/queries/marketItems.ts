import { eq, not } from "drizzle-orm";
import { db } from "../index.js";
import { marketItems, NewMarketItem } from "../schema.js";
import { deleteItem } from "./items.js";

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

export const purchaseMarketItems = async () => {
  const now = new Date();

  const purchased = await db
    .update(marketItems)
    .set({ status: "Bought", updatedAt: now })
    .where(not(eq(marketItems.status, "Bought")))
    .returning();

  for (const item of purchased) {
    await deleteItem(item.itemId);
  }

  return purchased;
};
