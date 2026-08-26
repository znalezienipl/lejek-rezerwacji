import Link from "next/link"
import { ArrowUpRight, LayoutGrid, ListTree, Rows3 } from "lucide-react"
import type { Metadata } from "next"
import { themeMeta, themeOrder, variants } from "@/components/booking/registry"
import { screenTitles } from "@/lib/booking-data"

export const metadata: Metadata = {
  title: "Booking system — 9 layout mockups",
  description:
    "Nine static booking-flow mockups: three visual worlds by three layout approaches, each covering the same seven screens.",
}

const palettes: Record<string, string[]> = {
  atelier: ["#f5f1ea", "#e6ddce", "#b79b6e", "#2b2823"],
  glamour: ["#241d1c", "#5a1220", "#d9a441", "#e79bb0"],
  wellness: ["#eae6da", "#c9d1bd", "#c69a86", "#4b5741"],
}

const variantIcons = [ListTree, Rows3, LayoutGrid]

export default function BookingIndexPage() {
  return (
    <main className="min-h-screen bg-[#0e0d0c] font-sans text-[#f3efe8] antialiased">
      {/* ---------------- top bar ---------------- */}
      <header className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-medium tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
            Znalezieni
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-[#f3efe8]/50">Beauty Studio</span>
        </Link>
        <span className="hidden text-xs uppercase tracking-[0.25em] text-[#f3efe8]/50 sm:block">
          Booking System Exploration
        </span>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-12 sm:px-8 md:pt-20">
        <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#c9a86a]">
          <span aria-hidden className="h-px w-8 bg-[#c9a86a]/60" />
          Three worlds · Three layouts · Nine mockups
        </p>
        <h1
          className="mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.02] sm:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Online booking, explored nine ways.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-sm leading-relaxed text-[#f3efe8]/65 sm:text-base">
          Each of the three visual worlds gets three different layout proposals. Colour and typography stay faithful to
          the world — only the composition, information density and the way the client is guided through the steps
          change. Every mockup is static: no logic, no state, no data.
        </p>
      </section>

      {/* ---------------- the seven screens ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-12 sm:px-8">
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#f3efe8]/50">
          Every mockup covers the same seven screens
        </h2>
        <ol className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {screenTitles.map((title, index) => (
            <li key={title} className="flex items-baseline gap-3 border-b border-[#f3efe8]/10 pb-3">
              <span className="font-mono text-[0.65rem] text-[#c9a86a]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[0.82rem] text-[#f3efe8]/80">{title}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- the three layout approaches ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-12 sm:px-8">
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#f3efe8]/50">
          The three layout approaches
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {variants.map((variant, index) => {
            const Icon = variantIcons[index]
            return (
              <div key={variant.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full border border-[#c9a86a]/40 text-[#c9a86a]">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.65rem] text-[#f3efe8]/40">
                    Variant {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {variant.name}
                </h3>
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#c9a86a]">{variant.approach}</p>
                <p className="text-[0.85rem] leading-relaxed text-[#f3efe8]/60">{variant.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---------------- the 9 mockups ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-12 pb-24 sm:px-8">
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#f3efe8]/50">
          All nine mockups
        </h2>

        <div className="mt-10 flex flex-col gap-14">
          {themeOrder.map((theme, themeIndex) => {
            const meta = themeMeta[theme]
            return (
              <div key={theme}>
                {/* world header */}
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-[#f3efe8]/10 pb-5">
                  <div className="flex items-end gap-5">
                    <span className="font-mono text-[0.7rem] text-[#c9a86a]">
                      {String(themeIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-3xl font-light leading-none" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {meta.brand}
                      </h3>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#f3efe8]/50">
                        {meta.label} · {meta.palette}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5" aria-hidden>
                      {palettes[theme].map((color) => (
                        <span
                          key={color}
                          className="size-5 rounded-full border border-[#f3efe8]/15"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <Link
                      href={`/${theme}`}
                      className="text-[0.68rem] uppercase tracking-[0.18em] text-[#f3efe8]/45 underline-offset-4 transition-colors hover:text-[#f3efe8] hover:underline"
                    >
                      View website
                    </Link>
                  </div>
                </div>

                {/* three variants for this world */}
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {variants.map((variant, index) => {
                    const Icon = variantIcons[index]
                    return (
                      <Link
                        key={variant.id}
                        href={`/booking/${theme}/${variant.id}`}
                        className="group flex flex-col gap-4 rounded-xl border border-[#f3efe8]/12 bg-[#f3efe8]/[0.03] p-6 transition-colors hover:border-[#c9a86a]/50 hover:bg-[#f3efe8]/[0.06]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2.5 text-[#c9a86a]">
                            <Icon className="size-4" aria-hidden />
                            <span className="font-mono text-[0.62rem]">
                              {themeIndex + 1}.{index + 1}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="size-4 text-[#f3efe8]/30 transition-colors group-hover:text-[#c9a86a]"
                            aria-hidden
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                            {variant.name}
                          </h4>
                          <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-[#f3efe8]/45">
                            {variant.approach}
                          </p>
                        </div>
                        <p className="text-[0.78rem] leading-relaxed text-[#f3efe8]/55">
                          {variant.description.split(".")[0]}.
                        </p>
                        <span className="mt-auto flex items-center gap-2 pt-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#f3efe8]/40">
                          7 screens · mobile + desktop
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
