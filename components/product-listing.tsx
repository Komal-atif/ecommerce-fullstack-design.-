"use client"

/* ============================================================
   Product Listing — main content area with view toggle,
   active filters, sort, and product grid/list
   ============================================================ */

import { useEffect, useState, useMemo } from "react"
import { Grid3X3, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import ProductCardList from "@/components/product-card-list"
import { useSearch } from "@/lib/context/search-context"
import type { Product } from "@/lib/types"
import type { ActiveFilters } from "@/components/sidebar-filters"

interface ProductListingProps {
  viewMode: "list" | "grid"
  onViewModeChange: (mode: "list" | "grid") => void
  activeFilters: ActiveFilters
  onRemoveFilter: (type: string, value: string) => void
  onClearAllFilters: () => void
  initialCategory?: string
  initialQuery?: string
}

export default function ProductListing({
  viewMode,
  onViewModeChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  initialCategory,
  initialQuery,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("featured")
  const { query: searchQuery } = useSearch()

  /* Fetch products from API */
  useEffect(() => {
    const params = new URLSearchParams()
    const q = initialQuery || searchQuery
    if (q) params.set("q", q)
    if (initialCategory) params.set("category", initialCategory)

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [searchQuery, initialCategory, initialQuery])

  /* Apply client-side filters on top of API results */
  const filtered = useMemo(() => {
    let result = [...products]

    /* Brand filter */
    if (activeFilters.brands.length > 0) {
      result = result.filter((p) => activeFilters.brands.includes(p.brand))
    }

    /* Rating filter */
    if (activeFilters.ratings.length > 0) {
      result = result.filter((p) =>
        activeFilters.ratings.some((r) => Math.floor(p.rating) >= r)
      )
    }

    /* Sort */
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        /* featured = default order */
        break
    }

    return result
  }, [products, activeFilters, sortBy])

  const hasFilters =
    activeFilters.brands.length > 0 ||
    activeFilters.features.length > 0 ||
    activeFilters.ratings.length > 0

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {filtered.length} items found
        </p>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active filter tags */}
      {hasFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.brands.map((b) => (
            <Badge
              key={`brand-${b}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {b}
              <button onClick={() => onRemoveFilter("brand", b)} aria-label={`Remove ${b} filter`}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.features.map((f) => (
            <Badge
              key={`feature-${f}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {f}
              <button onClick={() => onRemoveFilter("feature", f)} aria-label={`Remove ${f} filter`}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.ratings.map((r) => (
            <Badge
              key={`rating-${r}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {r}+ stars
              <button onClick={() => onRemoveFilter("rating", String(r))} aria-label={`Remove ${r} star filter`}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <button
            onClick={onClearAllFilters}
            className="text-sm text-[#0d6efd] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product grid or list */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-medium text-foreground">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((product) => (
            <ProductCardList key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
