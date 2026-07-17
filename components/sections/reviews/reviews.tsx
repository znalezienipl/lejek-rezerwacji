"use client"

import { Star, Quote } from "lucide-react"
import { useBrand } from "@/components/system/brand-context"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"
import { cn } from "@/lib/utils"

export function Reviews() {
  const config = useBrand()
  const { reviews } = config

  return (
    <Section id="reviews" theme={config.theme} className="bg-secondary/40">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <Eyebrow theme={config.theme}>{reviews.eyebrow}</Eyebrow>
          <SectionHeading theme={config.theme} className="mt-4">
            {reviews.title}
          </SectionHeading>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[var(--gold)] text-[var(--gold)]" aria-hidden />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{reviews.rating}</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.reviews.map((review, i) => (
            <Reveal key={review.author} delay={i * 100}>
              <figure
                className={cn(
                  "flex h-full flex-col gap-5 border border-border bg-card p-8",
                  config.theme === "atelier" && "rounded-none",
                  config.theme === "glamour" && "rounded-sm",
                  config.theme === "wellness" && "rounded-3xl",
                )}
              >
                <Quote
                  className={cn(
                    "size-8 shrink-0",
                    config.theme === "glamour" ? "text-[var(--gold)]" : "text-accent",
                  )}
                  aria-hidden
                />
                <blockquote className="flex-1">
                  <p
                    className={cn(
                      "text-pretty leading-relaxed text-card-foreground",
                      config.theme === "atelier" ? "font-serif text-lg italic" : "text-base",
                    )}
                  >
                    {review.quote}
                  </p>
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-card-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
