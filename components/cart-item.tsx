"use client"

/* ============================================================
   Cart Item — single row in the cart (image, name, qty, price)
   ============================================================ */

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/context/cart-context"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, saveForLater } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-b-0">
      {/* Product image */}
      <Link
        href={`/product/${product.id}`}
        className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md border border-border bg-muted"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="80px"
        />
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <Link
            href={`/product/${product.id}`}
            className="text-base font-medium text-foreground hover:text-[#0d6efd]"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Brand: {product.brand} | Category: {product.category}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => removeItem(product.id)}
              className="text-xs font-medium text-[#fa3434] hover:underline"
            >
              Remove
            </button>
            <button
              onClick={() => saveForLater(product.id)}
              className="text-xs font-medium text-[#0d6efd] hover:underline"
            >
              Save for later
            </button>
          </div>
        </div>

        {/* Quantity + price */}
        <div className="mt-2 flex items-center gap-4 sm:mt-0">
          <select
            value={quantity}
            onChange={(e) =>
              updateQuantity(product.id, parseInt(e.target.value, 10))
            }
            className="rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground"
          >
            {Array.from({ length: Math.min(product.stock, 20) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Qty: {i + 1}
              </option>
            ))}
          </select>
          <span className="min-w-[80px] text-right text-base font-bold text-foreground">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
