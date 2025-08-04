"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check-auth")
      const data = await response.json()
      console.log("🚀 ~ checkAuth ~ data:", data)
      setIsAuthenticated(data.isAuthenticated)
    }

    checkAuth()
  }, [])

  const login = async () => {
    await fetch("/api/auth/login", { method: "POST" })
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await fetch("/api/authlogout", { method: "POST" })
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
