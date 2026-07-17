"use client"

import { Check, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useBrand } from "@/components/system/brand-context"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"
import { cn } from "@/lib/utils"

export function Booking() {
  const config = useBrand()
  const { booking, contact } = config

  const cardRadius = cn(
    config.theme === "atelier" && "rounded-none",
    config.theme === "glamour" && "rounded-sm",
    config.theme === "wellness" && "rounded-[2rem]",
  )

  return (
    <Section id="booking" theme={config.theme}>
      <Container>
        <div
          className={cn(
            "grid overflow-hidden border border-border lg:grid-cols-2",
            cardRadius,
          )}
        >
          {/* Left — invitation */}
          <Reveal className="flex flex-col justify-center bg-primary p-8 text-primary-foreground sm:p-12 lg:p-14">
            <Eyebrow theme={config.theme} className="text-primary-foreground/70">
              {booking.eyebrow}
            </Eyebrow>
            <SectionHeading
              theme={config.theme}
              className="mt-4 text-primary-foreground [hyphens:auto] break-words text-2xl sm:text-3xl md:text-4xl"
            >
              {booking.title}
            </SectionHeading>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
              {booking.subtitle}
            </p>

            <ul className="mt-8 space-y-3">
              {booking.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-primary-foreground/90">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href={booking.cta.href}
              className={cn(
                "mt-10 inline-flex w-fit items-center justify-center bg-primary-foreground px-8 py-4 text-sm font-medium text-primary transition-transform hover:scale-[1.02]",
                config.theme === "atelier" && "rounded-none tracking-[0.15em] uppercase",
                config.theme === "glamour" && "rounded-sm uppercase tracking-wider",
                config.theme === "wellness" && "rounded-full",
              )}
            >
              {booking.cta.label}
            </a>
          </Reveal>

          {/* Right — practical details */}
          <Reveal delay={120} className="bg-card p-8 text-card-foreground sm:p-12 lg:p-14">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <MapPin className="size-5 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold">Visit us</h3>
                <address className="text-sm not-italic leading-relaxed text-muted-foreground">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="flex flex-col gap-2">
                <Clock className="size-5 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold">Opening hours</h3>
                <ul className="text-sm leading-relaxed text-muted-foreground">
                  {contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-card-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <Phone className="size-5 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold">Call</h3>
                <a href={`tel:${contact.phone}`} className="text-sm text-muted-foreground hover:text-accent">
                  {contact.phone}
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <Mail className="size-5 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold">Email</h3>
                <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-accent">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex flex-wrap gap-4">
                {contact.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-sm font-medium text-card-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
