// app/api/check-auth/route.ts
import { cookies } from "next/headers"
import { decrypt } from "@/lib/session"

export async function GET() {
  const session = (await cookies()).get("session")?.value
  const isAuthenticated = session ? await decrypt(session) : false

  return Response.json({ isAuthenticated })
}
