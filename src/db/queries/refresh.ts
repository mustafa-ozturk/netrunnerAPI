import { config } from "../../config.js";
import { db } from "../index.js";
import { refreshTokens } from "../schema.js";

export const createRefreshToken = async (userID: string, token: string) => {
  const rows = await db
    .insert(refreshTokens)
    .values({
      userId: userID,
      token: token,
      expiresAt: new Date(Date.now() + config.jwt.refreshDuration),
      revokedAt: null,
    })
    .returning();
  return rows.length > 0;
};
