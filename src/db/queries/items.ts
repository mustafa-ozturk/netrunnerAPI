import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { items, NewItem } from "../schema.js";

export const getItemsByUserId = async (userId: string) => {
  try {
    const rows = await db.select().from(items).where(eq(items.userId, userId));
    return rows;
  } catch (error: any) {
    console.log("[DB ERROR]", error?.cause);
  }
};

export const createItem = async (newItem: NewItem) => {
  try {
    const [row] = await db
      .insert(items)
      .values({
        itemName: newItem.itemName,
        itemType: newItem.itemType,
        description: newItem.description,
        quantity: newItem.quantity,
        userId: newItem.userId,
        value: newItem.value,
      })
      .returning();
    return row;
  } catch (error: any) {
    console.log("[createItem][DB ERROR]", error?.cause);
  }
};
