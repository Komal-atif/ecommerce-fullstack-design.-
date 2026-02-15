"use client"

/* ============================================================
   Home Page — marketplace homepage matching the reference
   design with hero, deals, categories, recommended items,
   newsletter, and footer.
   ============================================================ */

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Monitor,
  Shirt,
  Home,
  Car,
  Wrench,
  Dumbbell,
  Timer,
  Send,
  ShieldCheck,
  Truck,
  HeadphonesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import DiscountBanner from "@/components/discount-banner"
import type { Product } from "@/lib/types"

/* Category items for the sidebar */
const SIDEBAR_CATEGORIES = [
  { name: "Automobiles", icon: Car },
  { name: "Clothes", icon: Shirt },
  { name: "Electronics", icon: Monitor },
  { name: "Home and outdoor", icon: Home },
  { name: "Sports", icon: Dumbbell },
  { name: "Tools & equipment", icon: Wrench },
]

/* Deals timer data */
const DEALS = [
  { label: "Smart watches", discount: "-25%", bg: "bg-[#ffeee2]" },
  { label: "Laptops", discount: "-15%", bg: "bg-[#e5f1ff]" },
  { label: "Cameras", discount: "-40%", bg: "bg-[#f3f0fe]" },
  { label: "Headphones", discount: "-20%", bg: "bg-[#fef0e4]" },
  { label: "Speakers", discount: "-30%", bg: "bg-[#eaf8e6]" },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  /* Fetch all products from our API */
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  /* Pick products for sections */
  const electronics = products.filter((p) => p.category === "Electronics")
  const homeProducts = products.filter((p) => p.category === "Home and outdoor")
  const recommendedItems = products.slice(0, 10)

  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc]">
      <Header />

      {/* ========== HERO ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr_240px]">
          {/* Sidebar categories */}
          <nav className="hidden rounded-lg bg-card p-2 lg:block">
            {SIDEBAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted hover:text-[#0d6efd]"
              >
                <cat.icon className="h-4 w-4 text-muted-foreground" />
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Main hero banner */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#e3f0ff] to-[#d0e8ff] p-6 md:p-10">
            <div className="relative z-10 max-w-sm">
              <p className="mb-1 text-sm text-muted-foreground">
                Latest trending
              </p>
              <h1 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                Electronic Items
              </h1>
              <Link
                href="/products?category=Electronics"
                className="inline-flex items-center rounded-lg bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
              >
                Learn more
              </Link>
            </div>
            <div className="absolute bottom-0 right-4 top-0 hidden w-[240px] items-center md:flex">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
                alt="Electronics"
                width={240}
                height={240}
                className="object-contain"
              />
            </div>
          </div>

          {/* Side cards */}
          <div className="hidden flex-col gap-4 lg:flex">
            <div className="flex flex-1 flex-col justify-center rounded-lg bg-[#e5f1ff] p-4">
              <p className="text-sm text-muted-foreground">Free shipping on</p>
              <p className="text-sm font-semibold text-foreground">
                orders over $50
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center rounded-lg bg-[#ffeee2] p-4">
              <p className="text-sm text-muted-foreground">New arrivals</p>
              <p className="text-sm font-semibold text-foreground">
                Spring collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DEALS & OFFERS ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-4">
        <div className="flex items-start gap-4 overflow-x-auto rounded-lg border border-border bg-card p-4">
          {/* Timer card */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-card px-6 py-4">
            <h2 className="text-lg font-bold text-foreground">Deals and offers</h2>
            <p className="mb-3 text-sm text-muted-foreground">Hygiene equipment</p>
            <div className="flex gap-1">
              {[
                { val: "04", label: "Days" },
                { val: "13", label: "Hour" },
                { val: "34", label: "Min" },
                { val: "56", label: "Sec" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center rounded bg-muted px-2 py-1"
                >
                  <span className="text-base font-bold text-foreground">
                    {t.val}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deal items */}
          {DEALS.map((deal) => (
            <Link
              key={deal.label}
              href="/products"
              className={`flex shrink-0 flex-col items-center rounded-lg ${deal.bg} p-4`}
              style={{ minWidth: "140px" }}
            >
              <div className="mb-2 h-[100px] w-[100px] rounded bg-card/50" />
              <span className="text-sm font-medium text-foreground">
                {deal.label}
              </span>
              <span className="mt-1 rounded-full bg-[#ff3b30]/10 px-2 py-0.5 text-xs font-semibold text-[#ff3b30]">
                {deal.discount}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== HOME & OUTDOOR ========== */}
      {homeProducts.length > 0 && (
        <section className="mx-auto w-full max-w-[1280px] px-4 py-4">
          <div className="flex overflow-hidden rounded-lg border border-border bg-card">
            {/* Left banner */}
            <div className="hidden w-[240px] shrink-0 flex-col justify-between bg-[#f7f7f7] p-5 md:flex">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Home and outdoor
                </h3>
                <Link
                  href="/products?category=Home+and+outdoor"
                  className="mt-2 inline-flex items-center rounded-lg bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
                >
                  Source now
                </Link>
              </div>
            </div>
            {/* Products grid */}
            <div className="flex flex-1 flex-wrap">
              {homeProducts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="flex w-1/2 flex-col items-center border-b border-l border-border p-4 hover:bg-muted/50 sm:w-1/4"
                >
                  <div className="relative mb-2 h-[100px] w-[100px]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="100px"
                    />
                  </div>
                  <p className="line-clamp-1 text-center text-sm text-foreground">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From ${p.price.toFixed(0)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== CONSUMER ELECTRONICS ========== */}
      {electronics.length > 0 && (
        <section className="mx-auto w-full max-w-[1280px] px-4 py-4">
          <div className="flex overflow-hidden rounded-lg border border-border bg-card">
            <div className="hidden w-[240px] shrink-0 flex-col justify-between bg-[#f3f0fe] p-5 md:flex">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Consumer electronics
                </h3>
                <Link
                  href="/products?category=Electronics"
                  className="mt-2 inline-flex items-center rounded-lg bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
                >
                  Source now
                </Link>
              </div>
            </div>
            <div className="flex flex-1 flex-wrap">
              {electronics.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="flex w-1/2 flex-col items-center border-b border-l border-border p-4 hover:bg-muted/50 sm:w-1/4"
                >
                  <div className="relative mb-2 h-[100px] w-[100px]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="100px"
                    />
                  </div>
                  <p className="line-clamp-1 text-center text-sm text-foreground">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From ${p.price.toFixed(0)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== REQUEST QUOTE ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-4">
        <div className="flex flex-col items-center gap-6 rounded-lg bg-gradient-to-r from-[#0d6efd] to-[#005ade] p-6 md:flex-row md:p-10">
          <div className="flex-1 text-card">
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-sm text-[#b3cff5]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-lg bg-card p-5">
            <h3 className="mb-3 text-base font-semibold text-foreground">
              Send quote to suppliers
            </h3>
            <Input placeholder="What item you need?" className="mb-2" />
            <textarea
              placeholder="Type more details"
              rows={3}
              className="mb-2 w-full rounded-md border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
            />
            <div className="mb-3 flex gap-2">
              <Input placeholder="Quantity" type="number" className="w-1/2" />
              <select className="w-1/2 rounded-md border border-border px-3 py-2 text-sm">
                <option>Pcs</option>
                <option>Kg</option>
                <option>Boxes</option>
              </select>
            </div>
            <Button className="w-full bg-[#0d6efd] text-card hover:bg-[#0b5ed7]">
              <Send className="mr-2 h-4 w-4" /> Send inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* ========== RECOMMENDED ITEMS ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Recommended Items
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {recommendedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ========== EXTRA SERVICES ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Our extra services
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Search,
              title: "Source from Industry Hubs",
              color: "bg-[#e5f1ff]",
            },
            {
              icon: Wrench,
              title: "Customize Your Products",
              color: "bg-[#ffeee2]",
            },
            {
              icon: Truck,
              title: "Fast, reliable shipping by ocean or air",
              color: "bg-[#eaf8e6]",
            },
            {
              icon: ShieldCheck,
              title: "Product monitoring and inspection",
              color: "bg-[#f3f0fe]",
            },
          ].map((svc) => (
            <div key={svc.title} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className={`flex h-[140px] items-center justify-center ${svc.color}`}>
                <svc.icon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">{svc.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SUPPLIERS BY REGION ========== */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Suppliers by region
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { flag: "AE", name: "Arabic Emirates", url: "shopname.ae" },
            { flag: "AU", name: "Australia", url: "shopname.au" },
            { flag: "US", name: "United States", url: "shopname.us" },
            { flag: "RU", name: "Russia", url: "shopname.ru" },
            { flag: "IT", name: "Italy", url: "shopname.it" },
            { flag: "DK", name: "Denmark", url: "shopname.dk" },
            { flag: "FR", name: "France", url: "shopname.fr" },
            { flag: "CN", name: "China", url: "shopname.cn" },
            { flag: "GB", name: "Great Britain", url: "shopname.gb" },
          ].map((s) => (
            <div key={s.flag} className="flex items-center gap-2">
              <span className="text-xl">{s.flag}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.url}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="bg-muted py-10">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Subscribe on our newsletter
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Get daily news on upcoming offers from many suppliers all over the
            world.
          </p>
          <form
            className="mx-auto flex max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input placeholder="Email" type="email" className="flex-1" />
            <Button className="bg-[#0d6efd] text-card hover:bg-[#0b5ed7]">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <DiscountBanner />
      <Footer />
    </div>
  )
}

/* Simple Search icon used in services section */
function Search(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
