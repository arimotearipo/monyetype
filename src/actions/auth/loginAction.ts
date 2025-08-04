"use server"

import { createSession } from "@/lib/session"
import { LoginInfo, BaseServerActionResponse } from "@/types"

type LoginServerActionResponse = BaseServerActionResponse & {
  user: {
    username: string
    id: string
    email: string
  }
}

export async function loginAction(
  formData: LoginInfo,
): Promise<LoginServerActionResponse> {
  const res = await fetch(process.env.BASE_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const resJson = await res.json()

  await createSession({ userId: resJson.user.id })

  return resJson
}
