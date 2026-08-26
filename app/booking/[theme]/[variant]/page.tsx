import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Monitor, Smartphone } from "lucide-react"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import { DesktopStack, Label, MobileRail, Screen, ScreenTitle } from "@/components/booking/shared"
import { allMockups, themeMeta, themeOrder, variants, variantsById } from "@/components/booking/registry"

export function generateStaticParams() {
  return allMockups.map(({ theme, variant }) => ({ theme, variant: variant.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ theme: string; variant: string }>
}): Promise<Metadata> {
  const { theme, variant } = await params
  const meta = themeMeta[theme as ThemeId]
  const def = variantsById[variant]
  if (!meta || !def) return { title: "Booking mockup" }
  return {
    title: `${meta.brand} · ${def.name} — Booking mockup`,
    description: def.description,
  }
}

export default async function BookingMockupPage({
  params,
}: {
  params: Promise<{ theme: string; variant: string }>
}) {
  const { theme: themeParam, variant: variantParam } = await params
  const theme = themeParam as ThemeId
  const meta = themeMeta[theme]
  const def = variantsById[variantParam]
  if (!meta || !def) notFound()

  const variantIndex = variants.findIndex((v) => v.id === def.id) + 1

  return (
    <div className={cn(meta.className, "min-h-screen bg-background text-foreground")}>
      {/* ---------------- navigation chrome ---------------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All 9 mockups
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
          {/* theme switch */}
          <nav aria-label="Switch style" className="flex items-center gap-1">
            {themeOrder.map((id) => (
              <Link
                key={id}
                href={`/booking/${id}/${def.id}`}
                className={cn(
                  "rounded-[var(--radius)] px-2.5 py-1.5 font-sans text-[0.68rem] transition-colors",
                  id === theme
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {themeMeta[id].brand}
              </Link>
            ))}
          </nav>
          <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
          {/* variant switch */}
          <nav aria-label="Switch layout variant" className="flex items-center gap-1">
            {variants.map((v, index) => (
              <Link
                key={v.id}
                href={`/booking/${theme}/${v.id}`}
                className={cn(
                  "rounded-[var(--radius)] px-2.5 py-1.5 font-sans text-[0.68rem] transition-colors",
                  v.id === def.id
                    ? "border border-accent text-foreground"
                    : "border border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {index + 1}. {v.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ---------------- intro ---------------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-12 sm:px-8">
        <Label theme={theme}>
          {meta.label} · Variant {variantIndex} of 3
        </Label>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <ScreenTitle theme={theme} as="h1" className="text-4xl sm:text-5xl">
              {def.name}
            </ScreenTitle>
            <p className="mt-3 font-sans text-sm text-accent">{def.approach}</p>
          </div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">{def.description}</p>
        </div>
        <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
          {[
            ["Style world", `${meta.brand} — ${meta.label}`],
            ["Palette", meta.palette],
            ["Screens", "7 static views"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>
                <Label theme={theme}>{k}</Label>
              </dt>
              <dd className="mt-1 font-sans text-[0.82rem] text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- mobile screens ---------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <Smartphone className="size-4 text-accent" aria-hidden />
          <ScreenTitle theme={theme} as="h2" className="text-xl">
            Mobile
          </ScreenTitle>
          <span className="ml-auto font-sans text-[0.68rem] text-muted-foreground">
            380 px frames · scroll sideways
          </span>
        </div>
        <MobileRail>
          {def.screens.map((screen, index) => (
            <Screen key={screen.title} step={index + 1} title={screen.title} width="mobile">
              {screen.render(theme, "mobile")}
            </Screen>
          ))}
        </MobileRail>
      </section>

      {/* ---------------- desktop screens ---------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 pb-24 sm:px-8">
        <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
          <Monitor className="size-4 text-accent" aria-hidden />
          <ScreenTitle theme={theme} as="h2" className="text-xl">
            Desktop
          </ScreenTitle>
          <span className="ml-auto font-sans text-[0.68rem] text-muted-foreground">Full-width frames</span>
        </div>
        <DesktopStack>
          {def.screens.map((screen, index) => (
            <Screen key={screen.title} step={index + 1} title={screen.title} width="desktop">
              {screen.render(theme, "desktop")}
            </Screen>
          ))}
        </DesktopStack>
      </section>
    </div>
  )
}
