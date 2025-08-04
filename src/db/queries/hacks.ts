import { and, eq, lte } from "drizzle-orm";
import { getHackDuration } from "../../utils.js";
import { db } from "../index.js";
import { hacks } from "../schema.js";

export const createHack = async (userID: string, durationMs?: number) => {
  try {
    const hackDuration = durationMs ?? getHackDuration();

    const [row] = await db
      .insert(hacks)
      .values({
        userId: userID,
        completesAt: new Date(Date.now() + hackDuration),
        status: "In Progress",
      })
      .returning();

    return row;
  } catch (error: any) {
    console.log("[DB ERROR]", error?.cause);
  }
};

export const completeExpiredHacks = async () => {
  const now = new Date();

  return await db
    .update(hacks)
    .set({ status: "Completed", updatedAt: now })
    .where(and(lte(hacks.completesAt, now), eq(hacks.status, "In Progress")))
    .returning();
};
