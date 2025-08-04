"use server"

import { deleteSession } from "@/lib/session"

export async function logoutAction() {
  // fetch(process.env.BASE_URL + "/api/auth/logout", { method: "POST" });
  await deleteSession()
}
