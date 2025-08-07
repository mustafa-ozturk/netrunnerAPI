import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { items } from "../schema.js";

export const getItemsByUserId = async (userId: string) => {
  try {
    const rows = await db.select().from(items).where(eq(items.userId, userId));
    return rows;
  } catch (error: any) {
    console.log("[DB ERROR]", error?.cause);
  }
};
