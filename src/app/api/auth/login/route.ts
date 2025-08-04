import { db } from "@/db/database"
import { users } from "@/db/schema/user-schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { LoginSchema } from "@/types"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const validateFields = LoginSchema.safeParse({ email, password })

  if (!validateFields.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 403 },
    )
  }

  const rows = await db
    .select({
      hashedPassword: users.password,
      username: users.username,
      id: users.id,
    })
    .from(users)
    .where(eq(email, users.email))

  if (!rows.length) {
    return Response.json(
      { success: false, message: "Email not found" },
      { status: 404 },
    )
  }

  const { hashedPassword, username, id } = rows[0]

  const result = await bcrypt.compare(password, hashedPassword)

  if (!result) {
    return Response.json(
      { success: false, message: "Wrong password" },
      { status: 403 },
    )
  }

  return Response.json(
    { success: true, message: "Login success", user: { id, email, username } },
    { status: 200 },
  )
}
