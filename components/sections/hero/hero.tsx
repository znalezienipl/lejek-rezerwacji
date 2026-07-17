import Image from "next/image"
import type { BrandConfig } from "@/lib/site-config"
import { Container } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"
import { cn } from "@/lib/utils"

export function Hero({ config }: { config: BrandConfig }) {
  switch (config.theme) {
    case "glamour":
      return <GlamourHero config={config} />
    case "wellness":
      return <WellnessHero config={config} />
    default:
      return <AtelierHero config={config} />
  }
}

/* --------------------------- ATELIER --------------------------- */
function AtelierHero({ config }: { config: BrandConfig }) {
  const { hero } = config
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-32 md:pt-40">
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-accent">
                {hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-8 font-serif text-5xl font-light leading-[1.02] text-balance text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {hero.title}
                {hero.titleAccent ? (
                  <>
                    {" "}
                    <span className="italic text-accent">{hero.titleAccent}</span>
                  </>
                ) : null}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                {hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={hero.primaryCta.href}
                  className="bg-primary px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {hero.primaryCta.label}
                </a>
                {hero.secondaryCta ? (
                  <a
                    href={hero.secondaryCta.href}
                    className="group inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground"
                  >
                    {hero.secondaryCta.label}
                    <span className="h-px w-8 bg-foreground transition-all group-hover:w-12" />
                  </a>
                ) : null}
              </div>
            </Reveal>
            {hero.note ? (
              <Reveal delay={440}>
                <p className="mt-10 font-sans text-xs tracking-wide text-muted-foreground">{hero.note}</p>
              </Reveal>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <Reveal direction="left" duration={1400}>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={hero.image || "/placeholder.svg"}
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
      <div className="pointer-events-none absolute -right-24 top-1/3 -z-0 select-none font-serif text-[12rem] italic text-accent/5">
        beauté
      </div>
    </section>
  )
}

/* --------------------------- GLAMOUR --------------------------- */
function GlamourHero({ config }: { config: BrandConfig }) {
  const { hero } = config
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-background">
      <Image
        src={hero.image || "/placeholder.svg"}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <Container size="wide" className="relative z-10 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-accent">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-serif text-6xl font-bold uppercase leading-[0.92] tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
              {hero.title}
              {hero.titleAccent ? (
                <span className="block text-accent">{hero.titleAccent}</span>
              ) : null}
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-muted-foreground">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={hero.primaryCta.href}
                className="bg-primary px-9 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                {hero.primaryCta.label}
              </a>
              {hero.secondaryCta ? (
                <a
                  href={hero.secondaryCta.href}
                  className="border border-foreground/40 px-9 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {hero.secondaryCta.label}
                </a>
              ) : null}
            </div>
          </Reveal>
          {hero.note ? (
            <Reveal delay={460}>
              <p className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {hero.note}
              </p>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

/* --------------------------- WELLNESS --------------------------- */
function WellnessHero({ config }: { config: BrandConfig }) {
  const { hero } = config
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-32 md:pt-40">
      {/* organic floating accents */}
      <div className="zb-float pointer-events-none absolute -left-16 top-40 -z-0 size-64 rounded-full bg-accent/10 blur-2xl" />
      <div
        className="zb-float pointer-events-none absolute right-10 top-24 -z-0 size-40 rounded-full bg-primary/10 blur-2xl"
        style={{ animationDelay: "2s" }}
      />
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-accent">{hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-7 font-serif text-5xl font-light leading-[1.05] text-balance text-foreground sm:text-6xl lg:text-7xl">
                {hero.title}
                {hero.titleAccent ? (
                  <span className="block italic text-primary">{hero.titleAccent}</span>
                ) : null}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                {hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={hero.primaryCta.href}
                  className="bg-primary px-8 py-4 font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ borderRadius: "999px" }}
                >
                  {hero.primaryCta.label}
                </a>
                {hero.secondaryCta ? (
                  <a
                    href={hero.secondaryCta.href}
                    className="font-sans text-sm font-medium tracking-wide text-foreground underline decoration-accent/50 underline-offset-8 transition-colors hover:text-accent"
                  >
                    {hero.secondaryCta.label}
                  </a>
                ) : null}
              </div>
            </Reveal>
            {hero.note ? (
              <Reveal delay={440}>
                <p className="mt-10 font-sans text-xs tracking-wide text-muted-foreground">{hero.note}</p>
              </Reveal>
            ) : null}
          </div>

          <Reveal direction="left" duration={1500}>
            <div
              className={cn("relative aspect-[4/5] w-full overflow-hidden")}
              style={{ borderRadius: "180px 180px 32px 32px" }}
            >
              <Image
                src={hero.image || "/placeholder.svg"}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
