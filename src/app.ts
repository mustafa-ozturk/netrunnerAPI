import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";

import { middlewareErrorHandler } from "./middleware.js";
import { config } from "./config.js";
import { handlerCreateUser } from "./handlers/user.js";

// automatic migrations
const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

export const app = express();

app.use(express.json());

// unhandled async errors don’t automatically go to the error handler.
// so we are catching them
app.post("/api/users", async (req, res, next) => {
  try {
    await handlerCreateUser(req, res);
  } catch (error) {
    next(error);
  }
});

app.use(middlewareErrorHandler);
