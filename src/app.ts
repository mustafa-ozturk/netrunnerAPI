import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";

import { middlewareErrorHandler } from "./middleware.js";
import { config } from "./config.js";
import { handlerCreateUser } from "./handlers/user.js";
import { handlerLogin } from "./handlers/login.js";
import {
  handlerExtractHackById,
  handlerGetHackById,
  handlerStartHack,
} from "./handlers/hack.js";
import { startHackCompletionJob } from "./jobs/hackJobs.js";
import { handlerGetInventory } from "./handlers/inventory.js";
import { handlerGetStat } from "./handlers/stats.js";
import { handlerScan } from "./handlers/scan.js";

// automatic migrations
const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

export const app = express();

app.use(express.json());

// background jobs
startHackCompletionJob();

// unhandled async errors don’t automatically go to the error handler.
// so we are catching them
app.post("/api/users", async (req, res, next) => {
  try {
    await handlerCreateUser(req, res);
  } catch (error) {
    next(error);
  }
});

app.post("/api/login", async (req, res, next) => {
  try {
    await handlerLogin(req, res);
  } catch (error) {
    next(error);
  }
});

app.post("/api/hacks", async (req, res, next) => {
  try {
    await handlerStartHack(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/api/hacks/:hackID", async (req, res, next) => {
  try {
    await handlerGetHackById(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/api/inventory", async (req, res, next) => {
  try {
    await handlerGetInventory(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/api/hacks/:hackId/extract", async (req, res, next) => {
  try {
    await handlerExtractHackById(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/api/stats", async (req, res, next) => {
  try {
    await handlerGetStat(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/api/scan", async (req, res, next) => {
  try {
    await handlerScan(req, res);
  } catch (error) {
    next(error);
  }
});

app.use(middlewareErrorHandler);
