/* ============================================================
   Type definitions for the e-commerce application
   ============================================================ */

/** Product stored in the database / returned by API */
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  description: string
  category: string
  stock: number
  rating: number
  reviews: number
  sold: number
  brand: string
  features: string[]
  specs: Record<string, string>
}

/** A single item inside the shopping cart */
export interface CartItem {
  product: Product
  quantity: number
}

/** Saved-for-later item */
export interface SavedItem {
  product: Product
}

/** Cart state managed by the CartContext */
export interface CartState {
  items: CartItem[]
  savedItems: SavedItem[]
}

/** User record */
export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: "user" | "admin"
}

/** Public user info (no password hash) */
export interface PublicUser {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

/** JWT payload embedded in auth tokens */
export interface JWTPayload {
  sub: string
  email: string
  role: "user" | "admin"
  iat: number
  exp: number
}

/** Shape returned by the login / register endpoints */
export interface AuthResponse {
  token: string
  user: PublicUser
}

/** API error envelope */
export interface ApiError {
  error: string
}
