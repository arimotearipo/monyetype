"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/use-auth"
import { logoutAction } from "@/actions/auth/logoutAction"
import { cn } from "@/lib/utils"
import { routes } from "@/lib/routes"

export default function ActionBar() {
  const { isAuthenticated, username, deauthenticate } = useAuth()
  const pathname = usePathname()
  const route = useRouter()

  const handleLogout = () => {
    logoutAction()
    deauthenticate()
  }

  return (
    <div className="flex flex-row space-x-4 items-center">
      <Button
        variant={"link"}
        onClick={() => route.push(routes.game)}
        className={cn({
          underline: pathname.includes(routes.game),
        })}
      >
        Play
      </Button>
      {isAuthenticated ? (
        <Button variant={"link"} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button
          variant={"link"}
          onClick={() => route.push(routes.auth)}
          className={cn({
            underline: pathname.includes(routes.auth),
          })}
        >
          Login
        </Button>
      )}
      {!!username && <p className="place-items-end">Welcome, {username}</p>}
    </div>
  )
}
