import { text, serial, pgTable } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
})

export type TUser = typeof users.$inferSelect
export type TNewUser = typeof users.$inferInsert
