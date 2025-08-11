import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { NewScannedNode, scannedNodes } from "../schema.js";

export const createScannedNode = async (scannedNode: NewScannedNode) => {
  try {
    const [row] = await db.insert(scannedNodes).values(scannedNode).returning();
    return row;
  } catch (error: any) {
    console.log("[createScannedNode][DB ERROR]:", error?.cause);
  }
};

export const getScannedNodesByUserId = async (userId: string) => {
  try {
    const rows = await db
      .select()
      .from(scannedNodes)
      .where(eq(scannedNodes.userId, userId));
    return rows;
  } catch (error: any) {
    console.log("[getScannedNodesByUserId][DB ERROR]:", error?.cause);
  }
};

export const deleteScannedNodeById = async (id: string) => {
  try {
    const rows = await db.delete(scannedNodes).where(eq(scannedNodes.id, id));
    return rows.length > 0;
  } catch (error: any) {
    console.log("[deleteScannedNodeById][DB ERROR]:", error?.cause);
  }
};
