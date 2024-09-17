import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user-schema";

export const rhythmScores = pgTable("rhythm_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  timestamp: timestamp("datetime").notNull(),
  score: integer("score").notNull(),
});

export type TRhythmScore = typeof rhythmScores.$inferSelect;
export type TNewRhythmScore = typeof rhythmScores.$inferInsert;
