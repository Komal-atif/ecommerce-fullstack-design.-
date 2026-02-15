"use client"

/* ============================================================
   Admin Layout — wraps admin pages with auth protection.
   Redirects to /login if user is not authenticated as admin.
   ============================================================ */

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ShoppingCart,
  Package,
  LayoutDashboard,
  LogOut,
  ArrowLeft,
} from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isAdmin, loading, user, logout } = useAuth()
  const router = useRouter()

  /* Redirect if not authenticated or not admin */
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push("/login")
    }
  }, [isAuthenticated, isAdmin, loading, router])

  /* Show spinner while checking auth */
  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fafc]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0d6efd] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f7fafc]">
      {/* Sidebar */}
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border bg-card md:flex">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d6efd]">
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-[#0d6efd]">Admin</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border p-3">
          <div className="mb-2 px-3 text-xs text-muted-foreground">
            Signed in as {user?.name}
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to store
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header for admin */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-lg font-bold text-[#0d6efd]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d6efd]">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            Admin
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/admin/products" className="text-sm text-foreground">
              Products
            </Link>
            <Link href="/" className="text-sm text-muted-foreground">
              Store
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
