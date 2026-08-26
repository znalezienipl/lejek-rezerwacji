import Image from "next/image"
import { Check, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { designTokens, type ThemeId } from "@/tokens/design-tokens"
import { calendar } from "@/lib/booking-data"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type FrameWidth = "mobile" | "desktop"

export interface ScreenDef {
  /** Short caption shown above the screen frame */
  title: string
  render: (theme: ThemeId, width: FrameWidth) => React.ReactNode
}

export interface VariantDef {
  id: string
  name: string
  approach: string
  description: string
  screens: ScreenDef[]
}

/* ------------------------------------------------------------------ */
/* Theme helpers                                                       */
/* ------------------------------------------------------------------ */

export function isUpper(theme: ThemeId) {
  return designTokens[theme].typography.headingCase === "uppercase"
}

/** Heading inside a mockup screen. Follows the world's display font + case. */
export function ScreenTitle({
  theme,
  children,
  className,
  as: Tag = "h3",
}: {
  theme: ThemeId
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
}) {
  return (
    <Tag
      className={cn(
        "font-serif font-light leading-tight text-foreground text-pretty",
        isUpper(theme) && "uppercase tracking-[0.08em]",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Label({
  theme,
  children,
  className,
}: {
  theme: ThemeId
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn("font-sans text-[0.62rem] font-medium uppercase text-muted-foreground", className)}
      style={{ letterSpacing: designTokens[theme].typography.eyebrowTracking }}
    >
      {children}
    </span>
  )
}

/** Card surface honouring the world's corner language. */
export function Surface({
  children,
  className,
  active,
  muted,
}: {
  children: React.ReactNode
  className?: string
  active?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border transition-colors",
        muted ? "bg-secondary/40" : "bg-card",
        active ? "border-accent ring-1 ring-accent/40" : "border-border",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Btn({
  children,
  variant = "primary",
  className,
  full,
}: {
  children: React.ReactNode
  variant?: "primary" | "outline" | "ghost"
  className?: string
  full?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em] px-5 py-3",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-foreground/25 text-foreground",
        variant === "ghost" && "text-muted-foreground",
        full && "w-full",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Money({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-serif text-base text-foreground", className)}>{children}</span>
}

export function Duration({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-sans text-[0.7rem] text-muted-foreground", className)}>
      <Clock className="size-3" aria-hidden />
      {children}
    </span>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[var(--radius)] bg-accent/15 px-2 py-0.5 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-accent">
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Specialist                                                          */
/* ------------------------------------------------------------------ */

export function Avatar({
  src,
  alt,
  size = 40,
  className,
}: {
  src: string
  alt: string
  size?: number
  className?: string
}) {
  return (
    <span
      className={cn("relative shrink-0 overflow-hidden rounded-full border border-border", className)}
      style={{ width: size, height: size }}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill sizes={`${size}px`} className="object-cover" />
    </span>
  )
}

export function SpecialistRow({
  name,
  role,
  image,
  rating,
  size = 40,
  className,
}: {
  name: string
  role?: string
  image: string
  rating?: string
  size?: number
  className?: string
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-3", className)}>
      <Avatar src={image} alt={`${name}, specialist`} size={size} />
      <span className="min-w-0">
        <span className="block truncate font-sans text-[0.78rem] font-medium text-foreground">{name}</span>
        {role && <span className="block truncate font-sans text-[0.65rem] text-muted-foreground">{role}</span>}
      </span>
      {rating && (
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-sans text-[0.65rem] text-muted-foreground">
          <Star className="size-3 fill-accent text-accent" aria-hidden />
          {rating}
        </span>
      )}
    </span>
  )
}

/** Time range pill — always shows from–to, never just a duration. */
export function TimeRange({
  from,
  to,
  state = "free",
  className,
}: {
  from: string
  to: string
  state?: "free" | "few" | "taken"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 font-sans text-[0.78rem] tabular-nums",
        state === "taken" ? "text-muted-foreground/50 line-through" : "text-foreground",
        className,
      )}
    >
      {from}
      <span aria-hidden className="text-muted-foreground">
        –
      </span>
      {to}
    </span>
  )
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
      <Check className="mt-0.5 size-3 shrink-0 text-accent" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

/**
 * Static month grid. `size` only affects density so each layout variant can
 * present the same calendar airily or compactly.
 */
export function CalendarGrid({
  theme,
  size = "comfortable",
}: {
  theme: ThemeId
  size?: "compact" | "comfortable" | "airy"
}) {
  const cell =
    size === "compact" ? "h-8 text-[0.7rem]" : size === "airy" ? "h-12 text-[0.85rem]" : "h-10 text-[0.78rem]"
  const organic = designTokens[theme].corners.style === "organic"
  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {calendar.weekdays.map((day) => (
          <span key={day} className="py-1 text-center font-sans text-[0.6rem] uppercase text-muted-foreground">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: calendar.leadingBlanks }).map((_, index) => (
          <span key={`blank-${index}`} aria-hidden />
        ))}
        {calendar.days.map((day) => (
          <span
            key={day.date}
            className={cn(
              "flex items-center justify-center border font-sans tabular-nums",
              organic ? "rounded-full" : "rounded-[var(--radius)]",
              cell,
              day.selected
                ? "border-transparent bg-primary font-semibold text-primary-foreground"
                : day.state === "none"
                  ? "border-transparent text-muted-foreground/35 line-through"
                  : day.state === "few"
                    ? "border-accent/50 text-foreground"
                    : "border-border text-foreground",
            )}
          >
            {day.date}
          </span>
        ))}
      </div>
    </div>
  )
}

export function CalendarLegend({ theme }: { theme: ThemeId }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {[
        { label: "Available", cls: "border-border bg-card" },
        { label: "Few slots left", cls: "border-accent/60 bg-accent/10" },
        { label: "Fully booked", cls: "border-transparent bg-secondary" },
      ].map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span aria-hidden className={cn("size-3 rounded-[3px] border", item.cls)} />
          <Label theme={theme} className="normal-case tracking-normal text-[0.65rem]">
            {item.label}
          </Label>
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Screen + device frames                                              */
/* ------------------------------------------------------------------ */

/**
 * A labelled mockup screen. The inner wrapper is a container-query root so
 * screens respond to the *frame* width, not the browser viewport — that's what
 * lets the same markup render as a phone and as a desktop view side by side.
 */
export function Screen({
  step,
  title,
  width,
  children,
}: {
  step: number
  title: string
  width: "mobile" | "desktop"
  children: React.ReactNode
}) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="flex items-baseline gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-accent">{String(step).padStart(2, "0")}</span>
        {title}
      </figcaption>
      <div
        className={cn(
          "@container overflow-hidden border border-border bg-background shadow-sm",
          width === "mobile" ? "w-[380px] shrink-0 rounded-[24px]" : "w-full rounded-[var(--radius)]",
        )}
      >
        {children}
      </div>
    </figure>
  )
}

/** Phone status/nav chrome so mobile screens read as a real app. */
export function PhoneBar({ theme, title }: { theme: ThemeId; title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <span className="font-sans text-[0.7rem] text-muted-foreground">Back</span>
      <Label theme={theme}>{title}</Label>
      <span className="font-sans text-[0.7rem] text-muted-foreground">Close</span>
    </div>
  )
}

/** Horizontal scroller that holds the 7 mobile screens. */
export function MobileRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
      <div className="flex w-max gap-6">{children}</div>
    </div>
  )
}

/** Vertical stack that holds the 7 desktop screens. */
export function DesktopStack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-12">{children}</div>
}
