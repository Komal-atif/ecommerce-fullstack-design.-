"use client"

/* ============================================================
   Product Card List View — horizontal card for list layout
   ============================================================ */

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/context/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardListProps {
  product: Product
}

export default function ProductCardList({ product }: ProductCardListProps) {
  const { addItem } = useCart()

  return (
    <div className="flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md">
      {/* Image */}
      <Link
        href={`/product/${product.id}`}
        className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="180px"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-foreground hover:text-[#0d6efd]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1">
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
          <span className="text-xs text-muted-foreground">
            - {product.reviews} reviews
          </span>
          <span className="text-xs text-muted-foreground">
            - {product.sold} sold
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button
            size="sm"
            className="gap-1 bg-[#0d6efd] text-card hover:bg-[#0b5ed7]"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
