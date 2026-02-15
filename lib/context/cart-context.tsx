"use client"

/* ============================================================
   Cart Context — manages shopping cart state with localStorage
   ============================================================ */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { Product, CartItem, SavedItem, CartState } from "@/lib/types"

/* ---- Action types ---- */
type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "SAVE_FOR_LATER"; productId: string }
  | { type: "MOVE_TO_CART"; productId: string }
  | { type: "REMOVE_SAVED"; productId: string }
  | { type: "LOAD_STATE"; state: CartState }

/* ---- Reducer ---- */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity || 1 },
        ],
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      }
    case "CLEAR_CART":
      return { ...state, items: [] }
    case "SAVE_FOR_LATER": {
      const item = state.items.find((i) => i.product.id === action.productId)
      if (!item) return state
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
        savedItems: [...state.savedItems, { product: item.product }],
      }
    }
    case "MOVE_TO_CART": {
      const saved = state.savedItems.find(
        (s) => s.product.id === action.productId
      )
      if (!saved) return state
      return {
        items: [...state.items, { product: saved.product, quantity: 1 }],
        savedItems: state.savedItems.filter(
          (s) => s.product.id !== action.productId
        ),
      }
    }
    case "REMOVE_SAVED":
      return {
        ...state,
        savedItems: state.savedItems.filter(
          (s) => s.product.id !== action.productId
        ),
      }
    case "LOAD_STATE":
      return action.state
    default:
      return state
  }
}

/* ---- Context value interface ---- */
interface CartContextValue {
  items: CartItem[]
  savedItems: SavedItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  saveForLater: (productId: string) => void
  moveToCart: (productId: string) => void
  removeSaved: (productId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const INITIAL_STATE: CartState = { items: [], savedItems: [] }

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  /* Restore cart from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart_state")
      if (stored) {
        dispatch({ type: "LOAD_STATE", state: JSON.parse(stored) })
      }
    } catch {
      /* ignore parse errors */
    }
  }, [])

  /* Persist cart to localStorage on every change */
  useEffect(() => {
    localStorage.setItem("cart_state", JSON.stringify(state))
  }, [state])

  const addItem = useCallback(
    (product: Product, quantity?: number) =>
      dispatch({ type: "ADD_ITEM", product, quantity }),
    []
  )
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
    []
  )
  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  )
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), [])
  const saveForLater = useCallback(
    (productId: string) => dispatch({ type: "SAVE_FOR_LATER", productId }),
    []
  )
  const moveToCart = useCallback(
    (productId: string) => dispatch({ type: "MOVE_TO_CART", productId }),
    []
  )
  const removeSaved = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_SAVED", productId }),
    []
  )

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        savedItems: state.savedItems,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCart,
        removeSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/** Hook to access cart context */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
