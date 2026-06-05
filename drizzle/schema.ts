import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const dataIngestion = mysqlTable('data_ingestion', {
  id: int('id').autoincrement().primaryKey(),
  sourceName: text('sourceName').notNull(),
  sourceType: text('sourceType').notNull(),
  status: text('status').notNull().default('pending'),
  metadata: text('metadata'),
  storageKey: text('storageKey'), // Preparado para R2
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const digitalTwinGoals = mysqlTable('digital_twin_goals', {
  id: int('id').autoincrement().primaryKey(),
  ingestionId: int('ingestionId').references(() => dataIngestion.id),
  goalType: text('goalType').notNull(),
  description: text('description').notNull(),
  optimizationTarget: text('optimizationTarget'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type DataIngestion = typeof dataIngestion.$inferSelect;
export type InsertDataIngestion = typeof dataIngestion.$inferInsert;
export type DigitalTwinGoal = typeof digitalTwinGoals.$inferSelect;
export type InsertDigitalTwinGoal = typeof digitalTwinGoals.$inferInsert;