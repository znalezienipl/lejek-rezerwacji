import Image from "next/image"
import type { BrandConfig } from "@/lib/site-config"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"

export function Story({ config }: { config: BrandConfig }) {
  if (config.theme === "glamour") return <GlamourStory config={config} />
  return <SoftStory config={config} />
}

/* Atelier + Wellness share a refined editorial split, tuned by tokens/rounding */
function SoftStory({ config }: { config: BrandConfig }) {
  const { story } = config
  const rounded = config.theme === "wellness"
  return (
    <Section id="story" theme={config.theme}>
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden"
              style={{ borderRadius: rounded ? "32px 160px 32px 160px" : "0px" }}
            >
              <Image
                src={story.image || "/placeholder.svg"}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading className="mt-6 text-4xl sm:text-5xl">{story.title}</SectionHeading>
            </Reveal>
            <div className="mt-8 space-y-5">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={160 + i * 90}>
                  <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>

            {story.signature ? (
              <Reveal delay={360}>
                <div className="mt-10">
                  <p className="font-serif text-2xl italic text-foreground">{story.signature}</p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {story.signatureRole}
                  </p>
                </div>
              </Reveal>
            ) : null}

            {story.stats ? (
              <Reveal delay={440}>
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                  {story.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-4xl font-light text-accent">{s.value}</p>
                      <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function GlamourStory({ config }: { config: BrandConfig }) {
  const { story } = config
  return (
    <Section id="story" theme={config.theme}>
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading className="mt-6 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                {story.title}
              </SectionHeading>
            </Reveal>
            <div className="mt-8 space-y-5">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={160 + i * 90}>
                  <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>
            {story.signature ? (
              <Reveal delay={360}>
                <div className="mt-10 flex items-center gap-4">
                  <span className="h-10 w-px bg-accent" />
                  <div>
                    <p className="font-serif text-xl font-semibold text-foreground">{story.signature}</p>
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent">
                      {story.signatureRole}
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <Reveal direction="left">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {story.stats ? (
          <Reveal delay={200}>
            <div className="mt-16 grid grid-cols-3 gap-6 border-y border-border py-10">
              {story.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-4xl font-bold text-accent sm:text-6xl">{s.value}</p>
                  <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  )
}
