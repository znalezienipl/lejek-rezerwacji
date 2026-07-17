import Image from "next/image"
import type { BrandConfig } from "@/lib/site-config"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"
import { cn } from "@/lib/utils"

export function Team({ config }: { config: BrandConfig }) {
  const { team, theme } = config
  const rounded = theme === "wellness" ? "220px 220px 28px 28px" : "0px"
  const glamour = theme === "glamour"

  return (
    <Section id="team" theme={theme} className={cn(theme === "atelier" && "bg-secondary/40")}>
      <Container size="wide">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{team.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              className={cn("mt-6 text-4xl sm:text-5xl", glamour && "font-bold uppercase tracking-tight")}
            >
              {team.title}
            </SectionHeading>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
              {team.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 110}>
              <figure className="group">
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden"
                  style={{ borderRadius: rounded }}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={cn(
                      "object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105",
                      glamour && "grayscale group-hover:grayscale-0",
                    )}
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.24em] text-accent">
                    {member.role}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 font-serif text-2xl text-foreground",
                      glamour && "font-semibold uppercase tracking-wide",
                    )}
                  >
                    {member.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-muted-foreground">{member.specialty}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
