"use client"

/* ============================================================
   Cart Page — /cart
   Displays cart items, order summary, saved for later section.
   Matches the reference cart screenshot.
   ============================================================ */

import Link from "next/link"
import {
  ArrowLeft,
  ShieldCheck,
  HeadphonesIcon,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DiscountBanner from "@/components/discount-banner"
import CartItemComponent from "@/components/cart-item"
import CartSummary from "@/components/cart-summary"
import SavedForLater from "@/components/saved-for-later"
import { useCart } from "@/lib/context/cart-context"

export default function CartPage() {
  const { items, itemCount, clearCart } = useCart()

  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc]">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <h1 className="mb-5 text-2xl font-bold text-foreground">
          My cart ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20">
            <p className="mb-2 text-lg font-medium text-foreground">
              Your cart is empty
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Browse our products and add items to your cart.
            </p>
            <Link href="/products">
              <Button className="bg-[#0d6efd] text-card hover:bg-[#0b5ed7]">
                Start shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Cart items */}
            <div className="flex-1">
              <div className="rounded-lg border border-border bg-card p-4">
                {items.map((item) => (
                  <CartItemComponent key={item.product.id} item={item} />
                ))}
              </div>

              {/* Actions below cart items */}
              <div className="mt-4 flex items-center justify-between">
                <Link href="/products">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to shop
                  </Button>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-[#0d6efd] hover:underline"
                >
                  Remove all
                </button>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="w-full lg:w-[320px]">
              <CartSummary />
            </div>
          </div>
        )}

        {/* Service features */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Secure payment",
              desc: "Have you ever finally just",
            },
            {
              icon: HeadphonesIcon,
              title: "Customer support",
              desc: "Have you ever finally just",
            },
            {
              icon: Truck,
              title: "Free delivery",
              desc: "Have you ever finally just",
            },
          ].map((svc) => (
            <div
              key={svc.title}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <svc.icon className="h-10 w-10 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {svc.title}
                </p>
                <p className="text-xs text-muted-foreground">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Saved for later */}
      <SavedForLater />

      <DiscountBanner />
      <Footer />
    </div>
  )
}
