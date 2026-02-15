"use client"

/* ============================================================
   Header — top navigation bar with logo, search, nav icons.
   Responsive: hamburger menu on mobile, full bar on desktop.
   ============================================================ */

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  User,
  MessageSquare,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/context/cart-context"
import { useAuth } from "@/lib/context/auth-context"
import { useSearch } from "@/lib/context/search-context"

const NAV_CATEGORIES = [
  "All category",
  "Hot offers",
  "Gift boxes",
  "Projects",
  "Menu item",
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const { itemCount } = useCart()
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { setQuery } = useSearch()
  const router = useRouter()

  /** Handle search form submission */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(searchInput)
    router.push(`/products?q=${encodeURIComponent(searchInput)}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      {/* Top bar */}
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold text-[#0d6efd]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d6efd]">
            <ShoppingCart className="h-4 w-4 text-card" />
          </div>
          Brand
        </Link>

        {/* Search bar — hidden on mobile */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 md:flex"
        >
          <div className="flex w-full max-w-xl items-center rounded-lg border border-[#0d6efd]">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 border-0 shadow-none focus-visible:ring-0"
            />
            <select className="hidden border-l border-[#0d6efd] bg-transparent px-3 py-2 text-sm text-muted-foreground lg:block">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Home and outdoor</option>
            </select>
            <Button
              type="submit"
              size="sm"
              className="rounded-none rounded-r-lg bg-[#0d6efd] text-card hover:bg-[#0b5ed7]"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Desktop nav icons */}
        <nav className="hidden items-center gap-1 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              <Link
                href="/profile"
                className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
              >
                <User className="mb-0.5 h-5 w-5" />
                {user?.name || "Profile"}
              </Link>
              <button
                onClick={logout}
                className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
              >
                <LogOut className="mb-0.5 h-5 w-5" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
            >
              <User className="mb-0.5 h-5 w-5" />
              Profile
            </Link>
          )}
          <Link
            href="/products"
            className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
          >
            <MessageSquare className="mb-0.5 h-5 w-5" />
            Message
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
          >
            <Heart className="mb-0.5 h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/cart"
            className="relative flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
          >
            <ShoppingCart className="mb-0.5 h-5 w-5" />
            My cart
            {itemCount > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b30] p-0 text-[10px] text-card">
                {itemCount}
              </Badge>
            )}
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="flex flex-col items-center px-3 py-1 text-xs text-muted-foreground hover:text-[#0d6efd]"
            >
              <Shield className="mb-0.5 h-5 w-5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Desktop secondary nav */}
      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-2">
          <button className="flex items-center gap-1 text-sm font-medium text-foreground">
            <Menu className="h-4 w-4" />
            All category
            <ChevronDown className="h-3 w-3" />
          </button>
          {NAV_CATEGORIES.slice(1).map((cat) => (
            <Link
              key={cat}
              href="/products"
              className="text-sm text-foreground hover:text-[#0d6efd]"
            >
              {cat}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-foreground hover:text-[#0d6efd]"
            >
              Help
            </Link>
            <select className="bg-transparent text-sm text-foreground">
              <option>English, USD</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center rounded-lg border border-border">
              <Input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 border-0 shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-none rounded-r-lg bg-[#0d6efd] text-card"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          {/* Mobile links */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Cart
              {itemCount > 0 && (
                <Badge className="bg-[#ff3b30] text-card">{itemCount}</Badge>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hi, {user?.name}
                </span>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm text-[#0d6efd]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="text-left text-sm text-destructive"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm text-[#0d6efd]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
