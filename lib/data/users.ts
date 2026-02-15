/* ============================================================
   In-memory user store with pre-seeded admin account
   ============================================================ */

import bcrypt from "bcryptjs"
import type { User, PublicUser } from "../types"

/** In-memory user list. Pre-seeded with one admin user. */
const users: User[] = [
  {
    id: "admin-001",
    name: "Admin",
    email: "admin@store.com",
    /* Hash for "admin123" */
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
]

/** Strip the password hash before returning user data */
export function toPublicUser(user: User): PublicUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

/** Find a user by email */
export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email)
}

/** Find a user by ID */
export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

/** Register a new user. Returns the user or null if email exists. */
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User | null> {
  if (findUserByEmail(email)) return null
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash,
    role: "user",
  }
  users.push(newUser)
  return newUser
}

/** Verify a user's password. Returns the user if valid. */
export async function verifyPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = findUserByEmail(email)
  if (!user) return null
  const valid = await bcrypt.compare(password, user.passwordHash)
  return valid ? user : null
}
