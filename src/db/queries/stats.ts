import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { stats } from "../schema.js";

export const createNewStat = async (userId: string) => {
  try {
    const [row] = await db
      .insert(stats)
      .values({
        userId: userId,
      })
      .returning();
    return row;
  } catch (error: any) {
    console.log("[createNewStat][DB ERROR]", error?.cause);
  }
};

export const getStatByUserId = async (userId: string) => {
  try {
    const [row] = await db.select().from(stats).where(eq(stats.userId, userId));
    return row;
  } catch (error: any) {
    console.log("[getStatByUserId][DB ERROR]", error?.cause);
  }
};
