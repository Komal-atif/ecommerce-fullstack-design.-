"use client"

/* ============================================================
   Sidebar Filters — brand, features, rating checkboxes.
   On mobile: renders inside a sheet overlay.
   ============================================================ */

import { X, Star, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export interface ActiveFilters {
  brands: string[]
  features: string[]
  ratings: number[]
}

interface SidebarFiltersProps {
  activeFilters: ActiveFilters
  onToggleBrand: (brand: string) => void
  onToggleFeature: (feature: string) => void
  onToggleRating: (rating: number) => void
  mobileOpen: boolean
  onMobileClose: () => void
  availableBrands?: string[]
}

const DEFAULT_BRANDS = [
  "Samsung",
  "Apple",
  "Canon",
  "Sony",
  "Nike",
  "Adidas",
  "GoPro",
  "JBL",
  "Dyson",
  "Breville",
]

const FEATURES = [
  "Wireless",
  "Waterproof",
  "Noise Canceling",
  "Bluetooth",
  "USB-C",
  "Fast Charging",
]

export default function SidebarFilters({
  activeFilters,
  onToggleBrand,
  onToggleFeature,
  onToggleRating,
  mobileOpen,
  onMobileClose,
  availableBrands,
}: SidebarFiltersProps) {
  const [brandsExpanded, setBrandsExpanded] = useState(true)
  const [featuresExpanded, setFeaturesExpanded] = useState(true)
  const [ratingsExpanded, setRatingsExpanded] = useState(true)

  const brands = availableBrands || DEFAULT_BRANDS

  const content = (
    <div className="flex flex-col gap-5 py-2">
      {/* Brands */}
      <div>
        <button
          onClick={() => setBrandsExpanded(!brandsExpanded)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-foreground"
        >
          Brand
          {brandsExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {brandsExpanded && (
          <div className="flex flex-col gap-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
              >
                <Checkbox
                  checked={activeFilters.brands.includes(brand)}
                  onCheckedChange={() => onToggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <button
          onClick={() => setFeaturesExpanded(!featuresExpanded)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-foreground"
        >
          Features
          {featuresExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {featuresExpanded && (
          <div className="flex flex-col gap-2">
            {FEATURES.map((feature) => (
              <label
                key={feature}
                className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
              >
                <Checkbox
                  checked={activeFilters.features.includes(feature)}
                  onCheckedChange={() => onToggleFeature(feature)}
                />
                {feature}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div>
        <button
          onClick={() => setRatingsExpanded(!ratingsExpanded)}
          className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-foreground"
        >
          Rating
          {ratingsExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {ratingsExpanded && (
          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
              >
                <Checkbox
                  checked={activeFilters.ratings.includes(rating)}
                  onCheckedChange={() => onToggleRating(rating)}
                />
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rating
                          ? "fill-[#ff9017] text-[#ff9017]"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[220px] shrink-0 lg:block">{content}</aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={onMobileClose}
          />
          <div className="relative z-10 flex w-[280px] flex-col bg-card p-4 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Filters</h3>
              <button onClick={onMobileClose} aria-label="Close filters">
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  )
}
