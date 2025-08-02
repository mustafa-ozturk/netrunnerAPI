import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";

import { middlewareErrorHandler } from "./middleware.js";
import { config } from "./config.js";

// automatic migrations
const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

export const app = express();

app.use(middlewareErrorHandler);
