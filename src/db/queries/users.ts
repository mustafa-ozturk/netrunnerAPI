import { ConflictError } from "../../error.js";
import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

export async function createUser(user: NewUser) {
  try {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  } catch (error: any) {
    if (error.cause?.constraint_name === "users_username_unique") {
      throw new ConflictError("Username already exists.");
    }
    throw error;
  }
}
