/* ============================================================
   JWT authentication utilities using jose (Edge-compatible)
   ============================================================ */

import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "./types"

/** Secret used to sign and verify tokens. In production use env var. */
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecommerce-super-secret-key-2024"
)

/** Create a signed JWT for the given user info. Expires in 7 days. */
export async function signToken(payload: {
  sub: string
  email: string
  role: "user" | "admin"
}): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET)
}

/** Verify and decode a JWT. Returns the payload or null if invalid. */
export async function verifyToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

/** Extract the Bearer token from an Authorization header value. */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null
  return authHeader.slice(7)
}
