"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import type { BrandConfig } from "@/lib/site-config"
import { useBrand } from "@/components/system/brand-context"
import { cn } from "@/lib/utils"

export function SiteNav({ config }: { config: BrandConfig }) {
  const { typography } = useBrand()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const upper = typography.headingCase === "uppercase"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/85 py-4 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-6",
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="flex flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span
            className={cn("font-serif text-2xl font-medium text-foreground", upper && "tracking-[0.2em]")}
          >
            {config.brandName}
          </span>
          <span className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
            {config.tagline}
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-9 md:flex">
          {config.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-xs font-medium text-foreground/80 transition-colors hover:text-accent",
                upper ? "uppercase tracking-[0.22em]" : "tracking-wide",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={config.booking.cta.href}
            className={cn(
              "bg-primary px-6 py-3 font-sans text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90",
              upper ? "uppercase tracking-[0.2em]" : "tracking-wide",
            )}
            style={{ borderRadius: "var(--radius)" }}
          >
            {config.booking.cta.label}
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* mobile panel */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-background px-6 pt-28 transition-transform duration-500 md:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex flex-col gap-6">
          {config.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl font-light text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={config.booking.cta.href}
          onClick={() => setOpen(false)}
          className="mt-10 bg-primary py-4 text-center font-sans text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          style={{ borderRadius: "var(--radius)" }}
        >
          {config.booking.cta.label}
        </a>
      </div>
    </header>
  )
}
