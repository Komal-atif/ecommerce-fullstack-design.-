"use client"

/* ============================================================
   Footer — multi-column footer matching the reference design
   ============================================================ */

import Link from "next/link"
import { ShoppingCart, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const FOOTER_LINKS = {
  About: ["About Us", "Find store", "Categories", "Blogs"],
  Partnership: ["About Us", "Find store", "Categories", "Blogs"],
  Information: ["Help Center", "Money Refund", "Shipping", "Contact us"],
  "For users": ["Login", "Register", "Settings", "My Orders"],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1280px] px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-xl font-bold text-[#0d6efd]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d6efd]">
                <ShoppingCart className="h-4 w-4 text-card" />
              </div>
              Brand
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Best information about the company goes here but now lorem ipsum is used.
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                (Icon, i) => (
                  <button
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-[#0d6efd] hover:text-card"
                    aria-label="Social link"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-base font-semibold text-foreground">
                {title}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/products"
                      className="text-sm text-muted-foreground hover:text-[#0d6efd]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get App column — shown on lg */}
          <div className="hidden lg:block">
            <h4 className="mb-3 text-base font-semibold text-foreground">
              Get app
            </h4>
            <div className="flex flex-col gap-2">
              <button className="flex h-10 items-center gap-2 rounded-lg bg-foreground px-3 text-xs text-card">
                App Store
              </button>
              <button className="flex h-10 items-center gap-2 rounded-lg bg-foreground px-3 text-xs text-card">
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ecommerce.
          </p>
          <p className="text-sm text-muted-foreground">English</p>
        </div>
      </div>
    </footer>
  )
}
