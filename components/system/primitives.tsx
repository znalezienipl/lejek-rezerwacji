import { cn } from "@/lib/utils"
import { designTokens, type ThemeId } from "@/tokens/design-tokens"

export function Section({
  id,
  theme,
  className,
  children,
}: {
  id?: string
  theme: ThemeId
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn(designTokens[theme].spacing.section, className)}>
      {children}
    </section>
  )
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode
  className?: string
  size?: "default" | "wide" | "narrow"
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-[1400px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-sans text-[0.7rem] font-medium uppercase",
        "text-accent",
        className,
      )}
      style={{ letterSpacing: "var(--zb-eyebrow-tracking, 0.3em)" }}
    >
      <span aria-hidden className="h-px w-6 bg-accent/60" />
      {children}
    </span>
  )
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3"
}) {
  return (
    <Tag
      className={cn(
        "font-serif font-light leading-[1.05] text-balance text-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
