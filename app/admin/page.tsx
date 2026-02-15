"use client"

/* ============================================================
   Admin Dashboard — overview with product count, quick links
   ============================================================ */

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, DollarSign, TrendingUp, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/types"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])

  /* Fetch all products for stats */
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {})
  }, [])

  /* Calculate statistics */
  const totalProducts = products.length
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)
  const totalSold = products.reduce((s, p) => s + p.sold, 0)
  const lowStock = products.filter((p) => p.stock < 20).length

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-[#e5f1ff] text-[#0d6efd]",
    },
    {
      label: "Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-[#eaf8e6] text-[#00b517]",
    },
    {
      label: "Total Sold",
      value: totalSold.toLocaleString(),
      icon: TrendingUp,
      color: "bg-[#fef0e4] text-[#ff9017]",
    },
    {
      label: "Low Stock Items",
      value: lowStock,
      icon: ShoppingBag,
      color: "bg-[#ffe5e5] text-[#fa3434]",
    },
  ]

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <Package className="h-8 w-8 text-[#0d6efd]" />
          <div>
            <p className="font-medium text-foreground">Manage Products</p>
            <p className="text-sm text-muted-foreground">
              Add, edit, or remove products
            </p>
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <ShoppingBag className="h-8 w-8 text-[#00b517]" />
          <div>
            <p className="font-medium text-foreground">View Storefront</p>
            <p className="text-sm text-muted-foreground">
              See what customers see
            </p>
          </div>
        </Link>
      </div>

      {/* Recent low-stock products */}
      {lowStock > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Low Stock Alert
          </h2>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-foreground">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-foreground">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) => p.stock < 20)
                  .map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-4 py-3 text-foreground">{p.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-[#fa3434]">
                        {p.stock}
                      </td>
                      <td className="px-4 py-3 text-right text-foreground">
                        ${p.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
