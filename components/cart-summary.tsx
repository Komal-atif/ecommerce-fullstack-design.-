"use client"

/* ============================================================
   Cart Summary — sidebar showing coupon, subtotal, tax, total
   ============================================================ */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/context/cart-context"
import { toast } from "sonner"

export default function CartSummary() {
  const { subtotal, itemCount } = useCart()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)

  /* Simple coupon logic: "SAVE10" gives $60 off */
  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(60)
      toast.success("Coupon applied! $60.00 discount.")
    } else {
      setDiscount(0)
      toast.error("Invalid coupon code.")
    }
  }

  const tax = subtotal * 0.01 /* 1% tax */
  const total = subtotal - discount + tax

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {/* Coupon */}
      <p className="mb-2 text-sm font-medium text-foreground">
        Have a coupon?
      </p>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Add coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" onClick={handleApplyCoupon}>
          Apply
        </Button>
      </div>

      <div className="h-px bg-border" />

      {/* Breakdown */}
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} items):
          </span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount:</span>
            <span className="text-[#00b517]">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax:</span>
          <span className="text-foreground">+${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-border" />

      {/* Total */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Total:</span>
        <span className="text-xl font-bold text-foreground">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button
        className="w-full bg-[#00b517] text-card hover:bg-[#00a015]"
        disabled={itemCount === 0}
        onClick={() => toast.success("Checkout initiated!")}
      >
        Checkout
      </Button>

      {/* Payment icons */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((m) => (
          <span
            key={m}
            className="rounded bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
