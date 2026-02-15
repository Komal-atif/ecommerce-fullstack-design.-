"use client"

/* ============================================================
   Auth Context — manages JWT authentication state globally
   ============================================================ */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { PublicUser, AuthResponse } from "@/lib/types"

interface AuthContextValue {
  user: PublicUser | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<string | null>
  register: (name: string, email: string, password: string) => Promise<string | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  /* Restore session from localStorage on mount */
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && !data.error) {
            setUser(data)
            setToken(storedToken)
          } else {
            localStorage.removeItem("auth_token")
          }
        })
        .catch(() => localStorage.removeItem("auth_token"))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  /** Login — returns error message or null on success */
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return data.error || "Login failed"
      const auth = data as AuthResponse
      setUser(auth.user)
      setToken(auth.token)
      localStorage.setItem("auth_token", auth.token)
      return null
    } catch {
      return "Network error"
    }
  }, [])

  /** Register — returns error message or null on success */
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) return data.error || "Registration failed"
        const auth = data as AuthResponse
        setUser(auth.user)
        setToken(auth.token)
        localStorage.setItem("auth_token", auth.token)
        return null
      } catch {
        return "Network error"
      }
    },
    []
  )

  /** Logout — clear token and user */
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/** Hook to access auth context */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
