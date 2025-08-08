import { eq, sql } from "drizzle-orm";
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

export const addEurodollars = async (userId: string, eurodollars: number) => {
  try {
    const rows = await db
      .update(stats)
      .set({ eurodollars: sql`${stats.eurodollars} + ${eurodollars}` })
      .where(eq(stats.userId, userId))
      .returning();

    return rows.length > 0;
  } catch (error: any) {
    console.log("[addEurodollars][DB ERROR]", error?.cause);
  }
};

export const addExperience = async (userId: string, experience: number) => {
  try {
    const rows = await db
      .update(stats)
      .set({ experience: sql`${stats.experience} + ${experience}` })
      .where(eq(stats.userId, userId))
      .returning();

    return rows.length > 0;
  } catch (error: any) {
    console.log("[addExperience][DB ERROR]", error?.cause);
  }
};
