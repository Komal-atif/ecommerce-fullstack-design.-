/* ============================================================
   GET /api/products  — list & search products
   POST /api/products — create a new product (admin only)
   ============================================================ */

import { NextRequest, NextResponse } from "next/server"
import { getAllProducts, createProduct } from "@/lib/data/products"
import { verifyToken, extractToken } from "@/lib/auth"

/** GET: Return all products. Accepts ?q= and ?category= query params. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || undefined
  const category = searchParams.get("category") || undefined
  const products = getAllProducts(query, category)
  return NextResponse.json(products)
}

/** POST: Create a product. Requires admin JWT. */
export async function POST(request: NextRequest) {
  const token = extractToken(request.headers.get("authorization"))
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const payload = await verifyToken(token)
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json()
  const product = createProduct(body)
  return NextResponse.json(product, { status: 201 })
}
