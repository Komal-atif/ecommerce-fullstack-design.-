"use client"

/* ============================================================
   Product Listing Page — /products
   Shows all products with sidebar filters, view toggle, sort.
   Reads ?q= and ?category= from URL search params.
   ============================================================ */

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SidebarFilters, { type ActiveFilters } from "@/components/sidebar-filters"
import ProductListing from "@/components/product-listing"

/* Wrap in Suspense because useSearchParams needs it */
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7fafc]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0d6efd] border-t-transparent" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || ""

  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    brands: [],
    features: [],
    ratings: [],
  })

  const toggleBrand = (brand: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }))
  }

  const toggleFeature = (feature: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const toggleRating = (rating: number) => {
    setActiveFilters((prev) => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter((r) => r !== rating)
        : [...prev.ratings, rating],
    }))
  }

  const removeFilter = (type: string, value: string) => {
    setActiveFilters((prev) => {
      if (type === "brand")
        return { ...prev, brands: prev.brands.filter((b) => b !== value) }
      if (type === "feature")
        return { ...prev, features: prev.features.filter((f) => f !== value) }
      if (type === "rating")
        return {
          ...prev,
          ratings: prev.ratings.filter((r) => r !== Number(value)),
        }
      return prev
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({ brands: [], features: [], ratings: [] })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc]">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Home / Products
          {initialCategory ? ` / ${initialCategory}` : ""}
          {initialQuery ? ` / Search: "${initialQuery}"` : ""}
        </p>
      </div>

      {/* Mobile filter toggle */}
      <div className="border-b border-border px-4 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <main className="mx-auto flex w-full max-w-[1280px] gap-6 px-4 py-5">
        <SidebarFilters
          activeFilters={activeFilters}
          onToggleBrand={toggleBrand}
          onToggleFeature={toggleFeature}
          onToggleRating={toggleRating}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />
        <ProductListing
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          onClearAllFilters={clearAllFilters}
          initialCategory={initialCategory}
          initialQuery={initialQuery}
        />
      </main>

      <Footer />
    </div>
  )
}
