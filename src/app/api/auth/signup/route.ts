import { db } from "@/db/database"
import { users } from "@/db/schema/user-schema"
import bcrypt from "bcryptjs"
import { SignupSchema } from "@/types"

export async function POST(req: Request) {
  const { username, email, password, confirmPassword } = await req.json()

  const validateFields = SignupSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  })
  if (!validateFields.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 403 },
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.insert(users).values({ username, email, password: hashedPassword })

    return Response.json(
      { success: true, message: "Signup success" },
      { status: 201 },
    )
  } catch (error) {
    return Response.json(
      { success: false, message: "Email already exists" },
      { status: 409 },
    )
  }
}
