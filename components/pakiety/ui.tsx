"use client"

import type React from "react"
import { cn } from "@/lib/utils"

/** Gold uppercase eyebrow. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Serif heading (Newsreader). */
export function H({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
}) {
  return (
    <Tag className={cn("font-serif font-medium leading-tight text-foreground text-balance", className)}>
      {children}
    </Tag>
  )
}

type BtnVariant = "primary" | "outline" | "ghost"

export function Btn({
  children,
  variant = "primary",
  full,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode
  variant?: BtnVariant
  full?: boolean
  onClick?: () => void
  className?: string
  type?: "button" | "submit"
}) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius)] px-5 font-sans text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        full && "w-full",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  )
}

/** Card surface. `selected` lifts it with an accent ring. `tone` sets emphasis. */
export function Card({
  children,
  className,
  selected,
  onClick,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  selected?: boolean
  onClick?: () => void
  as?: "div" | "button"
}) {
  const Tag = as
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "rounded-[calc(var(--radius)+2px)] border bg-card p-4 text-left transition-all",
        selected ? "border-accent ring-1 ring-accent" : "border-border",
        as === "button" && "w-full cursor-pointer hover:border-accent/60",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/** Small radio dot for option rows. */
export function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
        checked ? "border-accent" : "border-foreground/30",
      )}
    >
      {checked && <span className="size-2.5 rounded-full bg-accent" />}
    </span>
  )
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "neutral" | "accent" | "muted" | "warn"
}) {
  const tones = {
    neutral: "bg-secondary text-secondary-foreground",
    accent: "bg-accent/15 text-accent",
    muted: "bg-transparent text-muted-foreground border border-border",
    warn: "bg-destructive/12 text-destructive",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[0.65rem] font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

/** Persistent counter strip: chosen / left / valid-until. */
export function ProgressBadge({
  chosen,
  total,
  validity,
}: {
  chosen: number
  total: number
  validity: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-border bg-secondary/60 px-3.5 py-2.5">
      <span className="font-sans text-[0.72rem] text-foreground">
        Wybrano <span className="font-semibold">{chosen}</span> z {total} · zostało{" "}
        <span className="font-semibold">{total - chosen}</span>
      </span>
      <span className="font-sans text-[0.66rem] text-muted-foreground">ważny do {validity}</span>
    </div>
  )
}

/** Wizard progress dots for variant B. */
export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i === step ? "w-6 bg-accent" : i < step ? "w-1.5 bg-accent/60" : "w-1.5 bg-border",
          )}
        />
      ))}
    </div>
  )
}

/** Advisory note — warns, never blocks. */
export function Note({
  children,
  icon,
  tone = "warn",
}: {
  children: React.ReactNode
  icon?: React.ReactNode
  tone?: "warn" | "info"
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-[var(--radius)] border p-3.5",
        tone === "warn" ? "border-accent/40 bg-accent/8" : "border-border bg-secondary/50",
      )}
    >
      {icon && <span className="mt-0.5 shrink-0 text-accent">{icon}</span>}
      <div className="font-sans text-[0.74rem] leading-relaxed text-foreground">{children}</div>
    </div>
  )
}

/**
 * Device frame. Mobile = 390px; desktop = wider variant.
 * Scrolls internally so the mockup reads like a real screen.
 */
export function DeviceFrame({
  device,
  children,
}: {
  device: "mobile" | "desktop"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "theme-salon mx-auto w-full overflow-hidden rounded-[18px] border border-border bg-background shadow-[0_20px_60px_-30px_rgba(19,39,31,0.5)]",
        device === "mobile" ? "max-w-[390px]" : "max-w-[960px]",
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-3 font-sans text-[0.62rem] text-muted-foreground">
          salon.pl/rezerwacja
        </span>
      </div>
      <div className="max-h-[720px] overflow-y-auto">{children}</div>
    </div>
  )
}

/** Padding wrapper inside the frame. Wide switches to a roomier gutter. */
export function ScreenBody({
  children,
  wide,
  className,
}: {
  children: React.ReactNode
  wide?: boolean
  className?: string
}) {
  return <div className={cn("p-5", wide && "p-8", className)}>{children}</div>
}
