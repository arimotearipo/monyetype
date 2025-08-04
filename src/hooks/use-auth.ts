"use client"

import { useCallback, useEffect, useState } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  let _username = null
  if (typeof window !== "undefined") {
    _username = window.localStorage.getItem("username")
  }

  const deauthenticate = useCallback(() => {
    window.localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUsername(null)
  }, [])

  // to check for presence of username in local storage
  useEffect(() => {
    if (_username) {
      setIsAuthenticated(true)
      setUsername(_username)
    } else {
      setIsAuthenticated(false)
      setUsername(null)
    }
  }, [_username])

  return { isAuthenticated, username, deauthenticate }
}
