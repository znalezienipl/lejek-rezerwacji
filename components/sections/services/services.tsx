import type { BrandConfig, ServiceItem } from "@/lib/site-config"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"

export function Services({ config }: { config: BrandConfig }) {
  switch (config.theme) {
    case "glamour":
      return <GlamourServices config={config} />
    case "wellness":
      return <WellnessServices config={config} />
    default:
      return <AtelierServices config={config} />
  }
}

/* --------------------------- ATELIER: editorial menu --------------------------- */
function AtelierServices({ config }: { config: BrandConfig }) {
  const { services } = config
  return (
    <Section id="services" theme="atelier" className="bg-secondary/40">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{services.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading className="mt-6 text-4xl sm:text-5xl">{services.title}</SectionHeading>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">{services.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-border">
          {services.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <article className="group grid gap-3 border-b border-border py-9 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10">
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="font-serif text-2xl font-normal text-foreground transition-colors group-hover:text-accent md:text-3xl">
                      {item.name}
                    </h3>
                    {item.tag ? (
                      <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-1">
                  <span className="font-serif text-xl text-foreground">{item.price}</span>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.duration}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------- GLAMOUR: numbered drama --------------------------- */
function GlamourServices({ config }: { config: BrandConfig }) {
  const { services } = config
  return (
    <Section id="services" theme="glamour">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>{services.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading className="mt-6 text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                {services.title}
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">{services.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <article className="group flex h-full flex-col bg-card p-8 transition-colors hover:bg-secondary md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-5xl font-bold text-accent/40 transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.tag ? (
                    <span className="border border-accent/60 px-3 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-8 font-serif text-2xl font-semibold uppercase tracking-wide text-foreground md:text-3xl">
                  {item.name}
                </h3>
                <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-serif text-xl font-semibold text-foreground">{item.price}</span>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-accent">
                    {item.duration}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------- WELLNESS: soft cards --------------------------- */
function WellnessServices({ config }: { config: BrandConfig }) {
  const { services } = config
  return (
    <Section id="services" theme="wellness" className="bg-secondary/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>{services.eyebrow}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading className="mt-6 text-4xl sm:text-5xl">{services.title}</SectionHeading>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">{services.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <WellnessCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function WellnessCard({ item }: { item: ServiceItem }) {
  return (
    <article
      className="group flex h-full flex-col bg-card p-8 transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-10"
      style={{ borderRadius: "28px" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-normal text-foreground">{item.name}</h3>
        {item.tag ? (
          <span
            className="bg-accent/15 px-3 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground"
            style={{ borderRadius: "999px" }}
          >
            {item.tag}
          </span>
        ) : null}
      </div>
      <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
        <span className="font-serif text-xl text-primary">{item.price}</span>
        <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {item.duration}
        </span>
      </div>
    </article>
  )
}
