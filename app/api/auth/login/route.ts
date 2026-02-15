/* ============================================================
   POST /api/auth/login — authenticate user and return JWT
   ============================================================ */

import { NextRequest, NextResponse } from "next/server"
import { verifyPassword, toPublicUser } from "@/lib/data/users"
import { signToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    )
  }

  const user = await verifyPassword(email, password)
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    )
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  })

  return NextResponse.json({ token, user: toPublicUser(user) })
}
