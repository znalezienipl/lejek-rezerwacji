"use client"

import { useBrand } from "@/components/system/brand-context"
import { Container } from "@/components/system/primitives"
import { cn } from "@/lib/utils"

export function SiteFooter() {
  const config = useBrand()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p
              className={cn(
                "text-lg font-semibold text-foreground",
                config.theme === "atelier" && "font-serif tracking-wide",
                config.theme === "glamour" && "font-serif uppercase tracking-[0.2em]",
                config.theme === "wellness" && "font-serif",
              )}
            >
              {config.brandName}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{config.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {config.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <p>
            {"© "}
            {year} {config.brandName}. {config.location}.
          </p>
          <p>
            A Znalezieni Beauty demo experience ·{" "}
            <a href="/" className="underline-offset-4 hover:text-foreground hover:underline">
              View all directions
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
