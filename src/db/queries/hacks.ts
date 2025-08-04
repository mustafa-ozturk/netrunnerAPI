import { getHackDuration } from "../../utils.js";
import { db } from "../index.js";
import { hacks } from "../schema.js";

export const createHack = async (userID: string) => {
  try {
    const [row] = await db
      .insert(hacks)
      .values({
        userId: userID,
        completesAt: new Date(Date.now() + getHackDuration()),
        status: "In Progress",
      })
      .returning();

    return row;
  } catch (error: any) {
    console.log("[DB ERROR]", error?.cause);
  }
};
