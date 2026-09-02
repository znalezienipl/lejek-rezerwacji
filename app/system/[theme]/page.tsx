import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BadgePercent, CalendarCheck, LayoutGrid, Monitor, ShieldCheck, Smartphone, TicketPercent, UserRound } from "lucide-react"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import { DesktopStack, Label, MobileRail, Screen, ScreenTitle, type VariantDef } from "@/components/booking/shared"
import { themeMeta, themeOrder } from "@/components/booking/registry"
import { splitVariant } from "@/components/booking/variant-split"
import { clientPanelDef } from "@/components/booking/client-panel"
import { consentLayerDef } from "@/components/booking/consent-layer"
import { visitRewardsDef } from "@/components/booking/visit-rewards"
import { promoCodeDef } from "@/components/booking/promo-code"

export function generateStaticParams() {
  return themeOrder.map((theme) => ({ theme }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ theme: string }>
}): Promise<Metadata> {
  const { theme } = await params
  const meta = themeMeta[theme as ThemeId]
  if (!meta) return { title: "Design system" }
  return {
    title: `${meta.brand} — Booking system + client panel`,
    description: `One consistent product for ${meta.brand}: the booking flow and the client account panel sharing colours, typography and components.`,
  }
}

/** One element of the pair, rendered at both frame widths. */
function ElementBlock({
  theme,
  def,
  index,
  total,
  id,
  icon: Icon,
  heading,
}: {
  theme: ThemeId
  def: VariantDef
  index: number
  total: number
  id: string
  icon: typeof CalendarCheck
  heading: string
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border pt-14">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* element header */}
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius)] border border-accent/40 bg-accent/10"
          >
            <Icon className="size-5 text-accent" />
          </span>
          <div className="min-w-0 flex-1">
            <Label theme={theme}>
              Element {index} of {total} · {heading}
            </Label>
            <ScreenTitle theme={theme} as="h2" className="mt-1.5 text-3xl sm:text-4xl">
              {def.name}
            </ScreenTitle>
            <p className="mt-2 font-sans text-sm text-accent">{def.approach}</p>
          </div>
          <p className="max-w-[46ch] font-sans text-sm leading-relaxed text-muted-foreground">
            {def.description}
          </p>
        </div>

        {/* mobile */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
            <Smartphone className="size-4 text-accent" aria-hidden />
            <ScreenTitle theme={theme} as="h3" className="text-lg">
              Mobile
            </ScreenTitle>
            <span className="ml-auto font-sans text-[0.68rem] text-muted-foreground">
              380 px frames · scroll sideways
            </span>
          </div>
          <MobileRail>
            {def.screens.map((screen, i) => (
              <Screen key={screen.title} step={i + 1} title={screen.title} width="mobile">
                {screen.render(theme, "mobile")}
              </Screen>
            ))}
          </MobileRail>
        </div>

        {/* desktop */}
        <div className="mt-14 pb-16">
          <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
            <Monitor className="size-4 text-accent" aria-hidden />
            <ScreenTitle theme={theme} as="h3" className="text-lg">
              Desktop
            </ScreenTitle>
            <span className="ml-auto font-sans text-[0.68rem] text-muted-foreground">Full-width frames</span>
          </div>
          <DesktopStack>
            {def.screens.map((screen, i) => (
              <Screen key={screen.title} step={i + 1} title={screen.title} width="desktop">
                {screen.render(theme, "desktop")}
              </Screen>
            ))}
          </DesktopStack>
        </div>
      </div>
    </section>
  )
}

export default async function SystemPairPage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme: themeParam } = await params
  const theme = themeParam as ThemeId
  const meta = themeMeta[theme]
  if (!meta) notFound()

  /* What makes the two elements read as one product. */
  const sharedTraits = [
    ["Surfaces", "Same card, same border, same corner radius"],
    ["Specialist", "Photo + name, identical row in both"],
    ["Price & time", "Serif price, from–to range never a bare duration"],
    ["Rail", "Left rail on desktop, compact bar on mobile"],
  ]

  return (
    <div className={cn(meta.className, "min-h-screen bg-background text-foreground")}>
      {/* ---------------- navigation chrome ---------------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
          <Link
            href="/system"
            className="inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All 3 systems
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
          <nav aria-label="Switch style" className="flex items-center gap-1">
            {themeOrder.map((id) => (
              <Link
                key={id}
                href={`/system/${id}`}
                className={cn(
                  "rounded-[var(--radius)] px-2.5 py-1.5 font-sans text-[0.68rem] transition-colors",
                  id === theme ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {themeMeta[id].brand}
              </Link>
            ))}
          </nav>
          <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
          <nav aria-label="Jump to element" className="flex items-center gap-1">
            <a
              href="#booking"
              className="rounded-[var(--radius)] border border-transparent px-2.5 py-1.5 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              1. Booking
            </a>
            <a
              href="#panel"
              className="rounded-[var(--radius)] border border-transparent px-2.5 py-1.5 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              2. Client panel
            </a>
            <a
              href="#consent"
              className="rounded-[var(--radius)] border border-transparent px-2.5 py-1.5 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              3. Consent
            </a>
            <a
              href="#rewards"
              className="rounded-[var(--radius)] border border-transparent px-2.5 py-1.5 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              4. Discounts
            </a>
            <a
              href="#promo"
              className="rounded-[var(--radius)] border border-transparent px-2.5 py-1.5 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              5. Promo code
            </a>
          </nav>
        </div>
      </header>

      {/* ---------------- intro ---------------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-14 pt-12 sm:px-8">
        <Label theme={theme}>{meta.label} · One consistent system</Label>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <ScreenTitle theme={theme} as="h1" className="text-4xl sm:text-5xl">
              {meta.brand}
            </ScreenTitle>
            <p className="mt-3 font-sans text-sm text-accent">Booking system + client panel</p>
          </div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            Five elements built from the same design language — the seven-step booking flow, the client panel she
            lands on, a consent layer that runs through both, a visit-discount programme, and a quiet promo-code
            field on the summary that stays out of the way until she actually has a code.
          </p>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {sharedTraits.map(([k, v]) => (
            <div key={k}>
              <dt>
                <Label theme={theme}>{k}</Label>
              </dt>
              <dd className="mt-1.5 font-sans text-[0.8rem] leading-relaxed text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        {/* element index */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "#booking", icon: CalendarCheck, n: "01", name: splitVariant.name, note: "7 screens · booking flow" },
            { href: "#panel", icon: UserRound, n: "02", name: clientPanelDef.name, note: "7 screens · account area" },
            { href: "#consent", icon: ShieldCheck, n: "03", name: consentLayerDef.name, note: "6 screens · panel, booking & link" },
            { href: "#rewards", icon: BadgePercent, n: "04", name: visitRewardsDef.name, note: "5 states · one visit counter" },
            { href: "#promo", icon: TicketPercent, n: "05", name: promoCodeDef.name, note: "6 states · summary field" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius)] border border-accent/40 bg-accent/10"
              >
                <item.icon className="size-5 text-accent" />
              </span>
              <span className="min-w-0">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">{item.n}</span>
                <ScreenTitle theme={theme} as="h2" className="mt-0.5 text-lg">
                  {item.name}
                </ScreenTitle>
                <span className="mt-0.5 block font-sans text-[0.7rem] text-muted-foreground">{item.note}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- element 1: booking ---------------- */}
      <ElementBlock
        theme={theme}
        def={splitVariant}
        index={1}
        total={5}
        id="booking"
        icon={CalendarCheck}
        heading="Booking system"
      />

      {/* ---------------- element 2: client panel ---------------- */}
      <ElementBlock
        theme={theme}
        def={clientPanelDef}
        index={2}
        total={5}
        id="panel"
        icon={UserRound}
        heading="Client panel"
      />

      {/* ---------------- element 3: consent layer ---------------- */}
      <ElementBlock
        theme={theme}
        def={consentLayerDef}
        index={3}
        total={5}
        id="consent"
        icon={ShieldCheck}
        heading="Consent layer"
      />

      {/* ---------------- element 4: visit-discount programme ---------------- */}
      <ElementBlock
        theme={theme}
        def={visitRewardsDef}
        index={4}
        total={5}
        id="rewards"
        icon={BadgePercent}
        heading="Visit discounts"
      />

      {/* ---------------- element 5: promo code ---------------- */}
      <ElementBlock
        theme={theme}
        def={promoCodeDef}
        index={5}
        total={5}
        id="promo"
        icon={TicketPercent}
        heading="Promo code"
      />

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-8">
          <span className="font-sans text-[0.72rem] text-muted-foreground">
            {meta.brand} · {meta.palette}
          </span>
          <Link
            href="/system"
            className="inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-accent"
          >
            <LayoutGrid className="size-3.5" aria-hidden />
            Compare all 3 systems
          </Link>
        </div>
      </footer>
    </div>
  )
}
