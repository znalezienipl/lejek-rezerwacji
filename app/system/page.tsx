import Link from "next/link"
import { ArrowUpRight, CalendarCheck, UserRound } from "lucide-react"
import type { Metadata } from "next"
import { themeMeta, themeOrder } from "@/components/booking/registry"
import { screenTitles } from "@/lib/booking-data"
import { panelScreenTitles } from "@/lib/client-panel-data"

export const metadata: Metadata = {
  title: "Booking system + client panel — 3 consistent systems",
  description:
    "Three visual worlds, each with two matching elements: the seven-step booking flow and the client account panel, built from one shared design language.",
}

const palettes: Record<string, string[]> = {
  atelier: ["#f5f1ea", "#e6ddce", "#b79b6e", "#2b2823"],
  glamour: ["#241d1c", "#5a1220", "#d9a441", "#e79bb0"],
  wellness: ["#eae6da", "#c9d1bd", "#c69a86", "#4b5741"],
}

const elements = [
  {
    icon: CalendarCheck,
    n: "01",
    name: "Booking system",
    note: "Split Panel · 7 screens",
    titles: screenTitles,
  },
  {
    icon: UserRound,
    n: "02",
    name: "Client panel",
    note: "Mobile-first account area · 7 screens",
    titles: panelScreenTitles,
  },
]

export default function SystemIndexPage() {
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
        <Link
          href="/booking"
          className="hidden text-xs uppercase tracking-[0.22em] text-[#f3efe8]/50 transition-colors hover:text-[#f3efe8] sm:block"
        >
          Earlier layout mockups
        </Link>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-12 sm:px-8 md:pt-20">
        <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#c9a86a]">
          <span aria-hidden className="h-px w-8 bg-[#c9a86a]/60" />
          Three worlds · Two elements each · Six sets of screens
        </p>
        <h1
          className="mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.02] sm:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          One design language, from booking to her own panel.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-sm leading-relaxed text-[#f3efe8]/65 sm:text-base">
          Each visual world now covers two connected products: the seven-step booking flow, kept in the Split Panel
          structure, and the client panel she reaches from an email or SMS link. Within a world they share colours,
          typography, cards, buttons and the same way of showing a specialist, a price and a time range.
        </p>
      </section>

      {/* ---------------- the two elements ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-12 sm:px-8">
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#f3efe8]/50">
          Every world covers the same fourteen screens
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          {elements.map((element) => (
            <div key={element.n}>
              <div className="flex items-center gap-3">
                <element.icon className="size-4 text-[#c9a86a]" aria-hidden />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#c9a86a]">
                  {element.n}
                </span>
                <span className="text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {element.name}
                </span>
                <span className="ml-auto text-[0.66rem] text-[#f3efe8]/40">{element.note}</span>
              </div>
              <ol className="mt-5 flex flex-col divide-y divide-[#f3efe8]/10 border-t border-[#f3efe8]/10">
                {element.titles.map((title, index) => (
                  <li key={title} className="flex items-baseline gap-4 py-2.5">
                    <span className="font-mono text-[0.62rem] tabular-nums text-[#c9a86a]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.82rem] text-[#f3efe8]/75">{title}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- the three worlds ---------------- */}
      <section className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-14 sm:px-8">
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#f3efe8]/50">
          Pick a world
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {themeOrder.map((id) => {
            const meta = themeMeta[id]
            return (
              <Link
                key={id}
                href={`/system/${id}`}
                className="group flex flex-col rounded-lg border border-[#f3efe8]/12 bg-[#f3efe8]/[0.03] p-6 transition-colors hover:border-[#c9a86a]/60 hover:bg-[#f3efe8]/[0.05]"
              >
                {/* palette */}
                <div className="flex items-center gap-1.5">
                  {palettes[id].map((colour) => (
                    <span
                      key={colour}
                      aria-hidden
                      className="size-5 rounded-full border border-[#f3efe8]/15"
                      style={{ backgroundColor: colour }}
                    />
                  ))}
                  <ArrowUpRight
                    className="ml-auto size-4 text-[#f3efe8]/35 transition-colors group-hover:text-[#c9a86a]"
                    aria-hidden
                  />
                </div>

                <h3 className="mt-6 text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {meta.brand}
                </h3>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[#c9a86a]">{meta.label}</p>
                <p className="mt-4 text-[0.78rem] leading-relaxed text-[#f3efe8]/55">{meta.palette}</p>

                <ul className="mt-6 flex flex-col gap-2 border-t border-[#f3efe8]/10 pt-4">
                  {elements.map((element) => (
                    <li key={element.n} className="flex items-center gap-2.5 text-[0.76rem] text-[#f3efe8]/70">
                      <element.icon className="size-3.5 shrink-0 text-[#c9a86a]/70" aria-hidden />
                      {element.name}
                      <span className="ml-auto text-[0.66rem] text-[#f3efe8]/35">7 screens</span>
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1400px] border-t border-[#f3efe8]/10 px-5 py-10 sm:px-8">
        <p className="text-[0.72rem] text-[#f3efe8]/40">
          All screens are static mockups — no logic, no state, no data.
        </p>
      </footer>
    </main>
  )
}
