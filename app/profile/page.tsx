"use client"

/* ============================================================
   Profile Page — shows user info and account actions.
   Redirects to /login if not authenticated.
   ============================================================ */

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Mail,
  Shield,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/context/auth-context"
import { useCart } from "@/lib/context/cart-context"

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin, loading, logout } = useAuth()
  const { itemCount, savedItems } = useCart()
  const router = useRouter()

  /* Redirect if not authenticated */
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f7fafc]">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0d6efd] border-t-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc]">
      <Header />

      <main className="mx-auto w-full max-w-[800px] px-4 py-8">
        {/* User info card */}
        <div className="mb-6 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0d6efd] text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              {isAdmin && (
                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-[#0d6efd]">
                  <Shield className="h-3 w-3" />
                  Administrator
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <ShoppingBag className="h-8 w-8 text-[#0d6efd]" />
            <div>
              <p className="text-lg font-bold text-foreground">{itemCount}</p>
              <p className="text-xs text-muted-foreground">Cart items</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <Heart className="h-8 w-8 text-[#fa3434]" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {savedItems.length}
              </p>
              <p className="text-xs text-muted-foreground">Saved items</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-3 rounded-lg border border-border bg-card p-4 sm:col-span-1">
            <Settings className="h-8 w-8 text-[#ff9017]" />
            <div>
              <p className="text-lg font-bold text-foreground capitalize">
                {user.role}
              </p>
              <p className="text-xs text-muted-foreground">Account role</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Account Actions
          </h2>
          <Link href="/cart">
            <Button variant="outline" className="w-full justify-start gap-2">
              <ShoppingBag className="h-4 w-4" />
              View My Cart
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Heart className="h-4 w-4" />
              Browse Products
            </Button>
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" />
                Admin Panel
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              logout()
              router.push("/")
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
