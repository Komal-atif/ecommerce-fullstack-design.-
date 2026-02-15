/* ============================================================
   GET    /api/products/:id  — single product
   PUT    /api/products/:id  — update product (admin)
   DELETE /api/products/:id  — delete product (admin)
   ============================================================ */

import { NextRequest, NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/data/products"
import { verifyToken, extractToken } from "@/lib/auth"

/** GET: Return a single product by its ID */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  return NextResponse.json(product)
}

/** PUT: Update a product. Requires admin JWT. */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractToken(request.headers.get("authorization"))
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const payload = await verifyToken(token)
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const updated = updateProduct(id, body)
  if (!updated) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  return NextResponse.json(updated)
}

/** DELETE: Remove a product. Requires admin JWT. */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractToken(request.headers.get("authorization"))
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const payload = await verifyToken(token)
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const deleted = deleteProduct(id)
  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
