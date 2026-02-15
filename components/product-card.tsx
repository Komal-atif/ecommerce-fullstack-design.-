"use client"

/* ============================================================
   Product Card — grid card used on home, listing, saved items
   ============================================================ */

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/context/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  /** Show "Move to cart" instead of heart icon */
  showMoveToCart?: boolean
  onMoveToCart?: () => void
}

export default function ProductCard({
  product,
  showMoveToCart,
  onMoveToCart,
}: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="absolute left-2 top-2 rounded-md bg-[#ff3b30] px-2 py-0.5 text-xs font-medium text-card">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <div className="mb-1 flex items-center gap-1">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.floor(product.rating)
                  ? "fill-[#ff9017] text-[#ff9017]"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <Link href={`/product/${product.id}`}>
          <p className="line-clamp-2 text-sm text-muted-foreground hover:text-[#0d6efd]">
            {product.name}
          </p>
        </Link>

        {/* Action buttons */}
        <div className="mt-2">
          {showMoveToCart ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1 text-xs"
              onClick={onMoveToCart}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Move to cart
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-xs"
                onClick={() => addItem(product)}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to cart
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                <Heart className="h-3.5 w-3.5" />
                <span className="sr-only">Save for later</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
