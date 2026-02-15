/* ============================================================
   POST /api/auth/register — create new user account
   ============================================================ */

import { NextRequest, NextResponse } from "next/server"
import { createUser, toPublicUser } from "@/lib/data/users"
import { signToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    )
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    )
  }

  const user = await createUser(name, email, password)
  if (!user) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    )
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  })

  return NextResponse.json({ token, user: toPublicUser(user) }, { status: 201 })
}
