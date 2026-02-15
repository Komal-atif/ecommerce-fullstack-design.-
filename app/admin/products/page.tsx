"use client"

/* ============================================================
   Admin Products — CRUD table for managing products.
   - Lists all products in a table with edit/delete actions.
   - "Add product" opens a modal form for creating new products.
   - "Edit" opens the same modal pre-filled with product data.
   - All operations call protected API routes using JWT.
   ============================================================ */

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

/* ---- Form state shape ---- */
interface ProductForm {
  name: string
  price: string
  originalPrice: string
  image: string
  description: string
  category: string
  stock: string
  brand: string
  rating: string
  reviews: string
  sold: string
  features: string
}

const EMPTY_FORM: ProductForm = {
  name: "",
  price: "",
  originalPrice: "",
  image: "",
  description: "",
  category: "Electronics",
  stock: "",
  brand: "",
  rating: "4.0",
  reviews: "0",
  sold: "0",
  features: "",
}

const CATEGORIES = ["Electronics", "Clothes", "Home and outdoor"]

export default function AdminProductsPage() {
  const { token } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  /* Fetch all products */
  const fetchProducts = useCallback(() => {
    setLoading(true)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  /* Open modal for creating a new product */
  const handleAdd = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setModalOpen(true)
  }

  /* Open modal for editing an existing product */
  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: String(product.price),
      originalPrice: String(product.originalPrice || ""),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: String(product.stock),
      brand: product.brand,
      rating: String(product.rating),
      reviews: String(product.reviews),
      sold: String(product.sold),
      features: product.features.join(", "),
    })
    setEditingId(product.id)
    setModalOpen(true)
  }

  /* Delete a product */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      toast.success("Product deleted")
      fetchProducts()
    } catch {
      toast.error("Failed to delete product")
    }
  }

  /* Submit form — create or update */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    /* Build the body payload */
    const body = {
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      image: form.image,
      images: form.image ? [form.image] : [],
      description: form.description,
      category: form.category,
      stock: parseInt(form.stock, 10),
      brand: form.brand,
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews, 10),
      sold: parseInt(form.sold, 10),
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      specs: {},
    }

    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : "/api/products"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Request failed")
      }

      toast.success(editingId ? "Product updated" : "Product created")
      setModalOpen(false)
      fetchProducts()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save product"
      )
    } finally {
      setSaving(false)
    }
  }

  /* Update a single form field */
  const updateField = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  /* Filter products by search */
  const filtered = searchTerm
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Button
          onClick={handleAdd}
          className="gap-2 bg-[#0d6efd] text-white hover:bg-[#0b5ed7]"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} products
        </span>
      </div>

      {/* Products table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Product
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-foreground sm:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Price
                </th>
                <th className="hidden px-4 py-3 text-right font-medium text-foreground md:table-cell">
                  Stock
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#0d6efd] border-t-transparent" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-b-0 hover:bg-muted/50"
                  >
                    {/* Product name + image */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1 font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ${product.price.toFixed(2)}
                    </td>
                    {/* Stock */}
                    <td className="hidden px-4 py-3 text-right md:table-cell">
                      <span
                        className={
                          product.stock < 20
                            ? "font-medium text-[#fa3434]"
                            : "text-foreground"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#0d6efd]"
                          onClick={() => handleEdit(product)}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Modal for Add / Edit ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setModalOpen(false)}
          />
          {/* Dialog */}
          <div className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-2"
            >
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Product Name *
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  placeholder="e.g. Canon Camera EOS 2000D"
                />
              </div>

              {/* Price + Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Price ($) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    required
                    placeholder="99.99"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Original Price ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={(e) => updateField("originalPrice", e.target.value)}
                    placeholder="129.99"
                  />
                </div>
              </div>

              {/* Category + Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Brand *
                  </label>
                  <Input
                    value={form.brand}
                    onChange={(e) => updateField("brand", e.target.value)}
                    required
                    placeholder="e.g. Canon"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Stock *
                </label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                  required
                  placeholder="50"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Image URL *
                </label>
                <Input
                  type="url"
                  value={form.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  required
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                  rows={3}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
                  placeholder="Product description..."
                />
              </div>

              {/* Features (comma-separated) */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Features (comma-separated)
                </label>
                <Input
                  value={form.features}
                  onChange={(e) => updateField("features", e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0d6efd] text-white hover:bg-[#0b5ed7]"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Product"
                      : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
