"use client"

/* ============================================================
   Product Detail Page — /product/:id
   Shows product images, info, specs, supplier info, related.
   ============================================================ */

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DiscountBanner from "@/components/discount-banner"
import ProductCard from "@/components/product-card"
import { useCart } from "@/lib/context/cart-context"
import type { Product } from "@/lib/types"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  /* Fetch product and related items */
  useEffect(() => {
    if (!params.id) return
    setLoading(true)

    Promise.all([
      fetch(`/api/products/${params.id}`).then((res) => res.json()),
      fetch("/api/products").then((res) => res.json()),
    ])
      .then(([prod, all]) => {
        if (prod.error) {
          router.push("/products")
          return
        }
        setProduct(prod)
        /* Related: same category, exclude current product */
        const related = (all as Product[])
          .filter((p) => p.category === prod.category && p.id !== prod.id)
          .slice(0, 4)
        setRelatedProducts(related)
      })
      .catch(() => router.push("/products"))
      .finally(() => setLoading(false))
  }, [params.id, router])

  if (loading || !product) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f7fafc]">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0d6efd] border-t-transparent" />
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.image]
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc]">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-[#0d6efd]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-[#0d6efd]">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product main section */}
      <section className="mx-auto w-full max-w-[1280px] px-4 pb-6">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[380px_1fr_280px]">
            {/* Image gallery */}
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              {/* Main image */}
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="380px"
                  priority
                />
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative h-16 w-16 overflow-hidden rounded-md border-2 ${
                        i === selectedImage
                          ? "border-[#0d6efd]"
                          : "border-border"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              {/* In stock badge */}
              <div className="mb-2 flex items-center gap-2">
                {product.stock > 0 ? (
                  <Badge className="bg-[#00b517]/10 text-[#00b517]">
                    <Check className="mr-1 h-3 w-3" /> In stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of stock</Badge>
                )}
              </div>

              <h1 className="mb-3 text-xl font-bold leading-tight text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#ff9017] text-[#ff9017]"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-[#ff9017]">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.sold} sold
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 rounded-lg bg-[#fff0df] px-4 py-3">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-2xl font-bold text-[#fa3434]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <>
                        <span className="text-base text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <Badge className="bg-[#ff3b30] text-card">
                          -{discount}% off
                        </Badge>
                      </>
                    )}
                </div>
              </div>

              {/* Specs table */}
              {Object.keys(product.specs).length > 0 && (
                <div className="mb-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-border">
                          <td className="w-[140px] py-2 text-muted-foreground">
                            {key}
                          </td>
                          <td className="py-2 text-foreground">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Features */}
              {product.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f) => (
                    <Badge key={f} variant="secondary">
                      {f}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Supplier / Action card */}
            <div className="p-5">
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c6f3c6] text-sm font-bold text-[#00b517]">
                  {product.brand.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product.brand}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified seller
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-4">
                <p className="mb-2 text-sm text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center text-sm font-medium text-foreground">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-[#0d6efd] text-card hover:bg-[#0b5ed7]"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Save for later
                </Button>
              </div>

              {/* Benefits */}
              <div className="mt-5 flex flex-col gap-3">
                {[
                  {
                    icon: Truck,
                    label: "Free delivery",
                    sub: "Orders over $50",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Secure payment",
                    sub: "256-bit SSL",
                  },
                  {
                    icon: RotateCcw,
                    label: "Free returns",
                    sub: "Within 30 days",
                  },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <b.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-foreground">{b.label}</p>
                      <p className="text-xs text-muted-foreground">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="mx-auto w-full max-w-[1280px] px-4 pb-6">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex border-b border-border">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-[#0d6efd] text-[#0d6efd]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-5">
            {activeTab === "description" && (
              <div className="max-w-2xl">
                <p className="leading-relaxed text-foreground">
                  {product.description}
                </p>
                {product.features.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <Check className="h-4 w-4 text-[#00b517]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {activeTab === "reviews" && (
              <p className="text-sm text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </p>
            )}
            {activeTab === "shipping" && (
              <div className="flex flex-col gap-2 text-sm text-foreground">
                <p>Standard shipping: 5-7 business days - Free on orders over $50</p>
                <p>Express shipping: 2-3 business days - $9.99</p>
                <p>Next day delivery: 1 business day - $19.99</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto w-full max-w-[1280px] px-4 pb-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Related products
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <DiscountBanner />
      <Footer />
    </div>
  )
}
