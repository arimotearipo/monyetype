"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/use-auth"
import { logoutAction } from "@/actions/auth/logoutAction"

export default function ActionBar() {
  const { isAuthenticated, username, deauthenticate } = useAuth()
  const route = useRouter()

  const handleLogout = () => {
    logoutAction()
    deauthenticate()
  }

  return (
    <div className="flex flex-row space-x-4 items-center">
      <Button variant={"link"} onClick={() => route.push("/game")}>
        Play
      </Button>
      {isAuthenticated ? (
        <Button variant={"link"} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant={"link"} onClick={() => route.push("/auth")}>
          Login
        </Button>
      )}
      {!!username && <p className="place-items-end">Welcome, {username}</p>}
    </div>
  )
}
