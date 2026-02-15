"use client"

/* ============================================================
   Client-side providers wrapper — wraps the app with all
   contexts: Auth, Cart, Search
   ============================================================ */

import { AuthProvider } from "@/lib/context/auth-context"
import { CartProvider } from "@/lib/context/cart-context"
import { SearchProvider } from "@/lib/context/search-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>{children}</SearchProvider>
      </CartProvider>
    </AuthProvider>
  )
}
