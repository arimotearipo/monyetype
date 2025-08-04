import { db } from "@/db/database"
import { TUser, users } from "@/db/schema/user-schema"
import { eq } from "drizzle-orm"

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, context: Context) {
  const id = (await context.params).id

  const result = await db.select().from(users).where(eq(users.id, +id))

  return Response.json(result)
}

export async function DELETE(_: Request, context: Context) {
  const id = (await context.params).id

  const result = await db.delete(users).where(eq(users.id, +id))

  return Response.json(result)
}

export async function PUT(req: Request, context: Context) {
  const id = (await context.params).id

  const body: TUser = await req.json()

  const result = await db
    .update(users)
    .set({ ...body })
    .where(eq(users.id, +id))

  return Response.json(result)
}
