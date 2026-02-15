/* ============================================================
   Discount Banner — "Super discount on more than 100 USD"
   ============================================================ */

import Link from "next/link"

export default function DiscountBanner() {
  return (
    <section className="mx-auto my-6 max-w-[1280px] px-4">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-[#005ade] px-6 py-5 sm:flex-row sm:px-10">
        <div>
          <h3 className="text-lg font-bold text-[#e9f0ff]">
            Super discount on more than 100 USD
          </h3>
          <p className="text-sm text-[#b3cff5]">
            Have you ever finally just write dummy info
          </p>
        </div>
        <Link
          href="/products"
          className="shrink-0 rounded-lg bg-[#ff9017] px-6 py-2.5 text-sm font-semibold text-card hover:bg-[#e68315]"
        >
          Shop now
        </Link>
      </div>
    </section>
  )
}
