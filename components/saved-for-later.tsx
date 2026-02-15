"use client"

/* ============================================================
   Saved For Later — grid of saved items with "Move to cart"
   ============================================================ */

import ProductCard from "@/components/product-card"
import { useCart } from "@/lib/context/cart-context"

export default function SavedForLater() {
  const { savedItems, moveToCart } = useCart()

  if (savedItems.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">
        Saved for later
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {savedItems.map((item) => (
          <ProductCard
            key={item.product.id}
            product={item.product}
            showMoveToCart
            onMoveToCart={() => moveToCart(item.product.id)}
          />
        ))}
      </div>
    </section>
  )
}
