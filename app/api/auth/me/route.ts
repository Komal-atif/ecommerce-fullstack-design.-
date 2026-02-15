/* ============================================================
   GET /api/auth/me — return current user from JWT
   ============================================================ */

import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { findUserById, toPublicUser } from "@/lib/data/users"

export async function GET(request: NextRequest) {
  const token = extractToken(request.headers.get("authorization"))
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const user = findUserById(payload.sub)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(toPublicUser(user))
}
