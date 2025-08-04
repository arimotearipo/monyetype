import { db } from "@/db/database"
import { users } from "@/db/schema/user-schema"

export async function GET() {
  const result = await db.select().from(users)

  return Response.json(result)
}

export async function DELETE() {
  const result = await db.delete(users)

  return Response.json(result)
}
