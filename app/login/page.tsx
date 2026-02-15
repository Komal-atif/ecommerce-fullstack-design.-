"use client"

/* ============================================================
   Login Page — email + password form with JWT authentication
   ============================================================ */

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/context/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const err = await login(email, password)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7fafc] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold text-[#0d6efd]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d6efd]">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          Brand
        </Link>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h1 className="mb-1 text-xl font-bold text-foreground">Sign in</h1>
          <p className="mb-5 text-sm text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>

          {error && (
            <div className="mb-4 rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0d6efd] text-white hover:bg-[#0b5ed7]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-medium text-[#0d6efd] hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-4 rounded-md bg-muted p-3">
            <p className="text-xs font-medium text-foreground">
              Demo admin credentials:
            </p>
            <p className="text-xs text-muted-foreground">
              Email: admin@store.com | Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
