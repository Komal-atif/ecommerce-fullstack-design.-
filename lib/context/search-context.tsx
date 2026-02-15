"use client"

/* ============================================================
   Search Context — shares search query state across header
   and product listing pages
   ============================================================ */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

interface SearchContextValue {
  query: string
  setQuery: (q: string) => void
  clearQuery: () => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  const clearQuery = useCallback(() => setQuery(""), [])

  return (
    <SearchContext.Provider value={{ query, setQuery, clearQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

/** Hook to access search context */
export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error("useSearch must be used within SearchProvider")
  return ctx
}
