import { and, eq, lte } from "drizzle-orm";
import { getHackDuration } from "../../utils.js";
import { db } from "../index.js";
import { hacks } from "../schema.js";

export const createHack = async (
  userID: string,
  target: string,
  durationMs?: number
) => {
  try {
    const hackDuration = durationMs ?? getHackDuration();

    const [row] = await db
      .insert(hacks)
      .values({
        userId: userID,
        completesAt: new Date(Date.now() + hackDuration),
        status: "In Progress",
        target: target,
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

export const completeExpiredHacksById = async (hackId: string) => {
  const now = new Date();
  const rows = await db
    .update(hacks)
    .set({ status: "Completed", updatedAt: now })
    .where(eq(hacks.id, hackId))
    .returning();

  return rows.length > 0;
};

export const getHackById = async (hackId: string) => {
  try {
    const [row] = await db.select().from(hacks).where(eq(hacks.id, hackId));
    return row;
  } catch (error: any) {
    console.log("[DB ERROR]", error?.cause);
  }
};

export const extractHackById = async (hackId: string) => {
  try {
    const now = new Date();
    // set the hack status as Extracted
    const rows = await db
      .update(hacks)
      .set({ status: "Extracted", updatedAt: now })
      .where(and(eq(hacks.id, hackId), eq(hacks.status, "Completed")))
      .returning();

    return rows.length > 0;
  } catch (error: any) {
    console.log("[extractHackById][DB ERROR]", error?.cause);
  }
};
