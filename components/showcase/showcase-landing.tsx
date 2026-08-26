import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Layers, Palette, Type, Sparkles } from "lucide-react"
import { brandConfigs } from "@/lib/site-config"
import { designTokens, type ThemeId } from "@/tokens/design-tokens"

const order: ThemeId[] = ["atelier", "glamour", "wellness"]

const directionMeta: Record<
  ThemeId,
  { number: string; palette: string[]; summary: string; vibe: string }
> = {
  atelier: {
    number: "01",
    palette: ["#f5f1ea", "#e6ddce", "#b79b6e", "#2b2823"],
    summary:
      "Quiet luxury. Editorial restraint, generous whitespace and a serif voice for boutiques that let their craft speak softly.",
    vibe: "Ivory · Champagne · Serif",
  },
  glamour: {
    number: "02",
    palette: ["#241d1c", "#5a1220", "#d9a441", "#e79bb0"],
    summary:
      "Bold and cinematic. Dark drama, gold accents and campaign energy for studios built to be seen and shared.",
    vibe: "Noir · Burgundy · Gold",
  },
  wellness: {
    number: "03",
    palette: ["#eae6da", "#c9d1bd", "#c69a86", "#4b5741"],
    summary:
      "Calm and organic. Soft curves, natural tones and unhurried pacing for spaces devoted to rest and ritual.",
    vibe: "Sage · Sand · Organic",
  },
}

export function ShowcaseLanding() {
  return (
    <main className="min-h-screen bg-[#0e0d0c] font-sans text-[#f3efe8] antialiased">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex flex-col leading-none">
          <span className="font-serif text-xl font-medium tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
            Znalezieni
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-[#f3efe8]/50">Beauty Studio</span>
        </div>
        <Link
          href="/booking"
          className="group inline-flex items-center gap-2 border border-[#f3efe8]/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-[#f3efe8]/70 transition-colors hover:border-[#b79b6e] hover:text-[#f3efe8]"
        >
          Booking system · 9 mockups
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-24">
        <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#c9a86a]">
          <span aria-hidden className="h-px w-8 bg-[#c9a86a]/60" />
          One system · Three signature directions
        </p>
        <h1
          className="mt-7 max-w-4xl text-balance text-4xl font-light leading-[1.02] sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Award-worthy websites for beauty businesses that refuse to look like everyone else.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-[#f3efe8]/70">
          We designed a single, extensible foundation — tokens, typography, motion and layout — then expressed it as
          three distinct brand worlds. Each is a complete, production-ready experience. Step inside any of them below.
        </p>

        <div className="mt-10 flex flex-wrap gap-8">
          {[
            { icon: Palette, label: "Token-driven theming" },
            { icon: Type, label: "6 curated typefaces" },
            { icon: Layers, label: "Composable sections" },
            { icon: Sparkles, label: "Scroll-choreographed motion" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-[#f3efe8]/60">
              <Icon className="size-4 text-[#c9a86a]" aria-hidden />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Direction cards */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {order.map((id) => {
            const config = brandConfigs[id]
            const meta = directionMeta[id]
            const tokens = designTokens[id]
            return (
              <Link
                key={id}
                href={`/${config.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#f3efe8]/12 bg-[#161412] transition-colors hover:border-[#c9a86a]/50"
              >
                {/* preview image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={config.hero.image || "/placeholder.svg"}
                    alt={`${config.brandName} — ${meta.summary}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-[#161412]/20 to-transparent" />
                  <span className="absolute left-5 top-5 font-serif text-sm text-[#f3efe8]/80" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {meta.number}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f3efe8]/60">{tokens.label}</p>
                    <p
                      className="mt-1 text-3xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {config.brandName}
                    </p>
                  </div>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c9a86a]">{meta.vibe}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f3efe8]/70">{meta.summary}</p>

                  <div className="mt-5 flex items-center gap-2">
                    {meta.palette.map((c) => (
                      <span
                        key={c}
                        className="size-5 rounded-full border border-[#f3efe8]/15"
                        style={{ backgroundColor: c }}
                        aria-hidden
                      />
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#f3efe8] transition-colors group-hover:text-[#c9a86a]">
                    Enter experience
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* System note */}
      <section className="border-t border-[#f3efe8]/10">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.4fr] md:py-24">
          <h2 className="text-balance text-2xl font-light leading-tight sm:text-3xl" style={{ fontFamily: "var(--font-cormorant)" }}>
            The same architecture underneath. Three completely different feelings on top.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                t: "Design tokens as the source of truth",
                d: "Color, type, spacing, corners and motion are defined once per direction, then consumed everywhere — swap a theme, transform the entire site.",
              },
              {
                t: "Content-driven, never hardcoded",
                d: "Every salon's name, services, team and prices live in a single config object, ready to be generated or edited without touching a component.",
              },
              {
                t: "Distinct, not templated",
                d: "Each direction reinterprets the same sections with its own layout language — so nothing feels like a recolored template.",
              },
              {
                t: "Motion with intent",
                d: "Reveal timing, easing and travel distance are tuned per brand, from restrained fades to premium choreography.",
              },
            ].map((item) => (
              <div key={item.t}>
                <h3 className="text-sm font-semibold text-[#f3efe8]">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f3efe8]/60">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#f3efe8]/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-[#f3efe8]/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Znalezieni Beauty. A design system demonstration.</p>
          <p className="uppercase tracking-[0.25em]">Crafted for premium beauty brands</p>
        </div>
      </footer>
    </main>
  )
}
