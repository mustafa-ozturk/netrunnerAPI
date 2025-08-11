import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  username: varchar("username", { length: 256 }).unique().notNull(),
  hashedPassword: varchar("hashed_password", { length: 256 }).notNull(),
});
export type NewUser = typeof users.$inferInsert;

export const refreshTokens = pgTable("refresh_tokens", {
  token: varchar("token", { length: 256 }).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});
export type NewRefreshToken = typeof refreshTokens.$inferInsert;

export const hacks = pgTable("hacks", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  completesAt: timestamp("completes_at").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  status: varchar("status", { length: 256 }).notNull(),
  target: varchar("target", { length: 256 }).notNull(), // TODO: will reference a table in the future
});
export type NewHack = typeof hacks.$inferInsert;

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  itemType: varchar("item_type", { length: 256 }).notNull(),
  itemName: varchar("item_name", { length: 256 }).notNull(),
  description: varchar("item_description", { length: 256 * 2 }).notNull(),
  quantity: integer().notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  value: integer().default(0).notNull(),
});
export type NewItem = typeof items.$inferInsert;

export const stats = pgTable("stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  experience: integer().default(0), // level will be derived from total exp
  eurodollars: integer().default(0),
});
export type NewStat = typeof items.$inferInsert;

export const marketItems = pgTable("market_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  itemId: uuid("item_id")
    .references(() => items.id, { onDelete: "cascade" })
    .notNull(),
  status: varchar("status", { length: 256 }).default("Auctioned"),
});
export type NewMarketItem = typeof marketItems.$inferInsert;

// Nodes for scanning
export const scannedNodes = pgTable("scanned_nodes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: varchar("name", { length: 256 }).notNull(),
});
export type NewScannedNode = typeof scannedNodes.$inferInsert;
