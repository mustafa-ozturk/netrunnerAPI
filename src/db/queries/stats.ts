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
