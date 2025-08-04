import { db } from "@/db/database"
import { rhythmScores } from "@/db/schema/score-schema"
import { users } from "@/db/schema/user-schema"
import { extractPayload } from "@/lib/session"
import { RhythmScoreSchema } from "@/types"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const timestamp = new Date(Date.now())
  const [{ score, durationPlayed }, payload] = await Promise.all([
    req.json(),
    extractPayload(),
  ])
  const speed = (score / durationPlayed) * 1000

  if (!payload) {
    return Response.json(
      {
        success: false,
        message: "Fail to establish user ID from session cookie",
      },
      { status: 403 },
    )
  }

  const { userId } = payload

  const validateFields = RhythmScoreSchema.safeParse({
    userId,
    timestamp,
    score,
    durationPlayed,
    speed,
  })

  if (!validateFields.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 403 },
    )
  }

  const rows = await db.select().from(users).where(eq(users.id, userId))
  if (rows.length !== 1) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 },
    )
  }

  try {
    await db
      .insert(rhythmScores)
      .values({ userId, timestamp, score, durationPlayed, speed })
    return Response.json(
      { success: true, message: "User score updated" },
      { status: 201 },
    )
  } catch (error) {
    return Response.json(
      { success: false, message: "Fail to update user score" },
      { status: 500 },
    )
  }
}
