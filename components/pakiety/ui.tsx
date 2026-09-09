"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export type World = "atelier" | "glamour" | "wellness"
export type Device = "mobile" | "desktop"

export const worldClass: Record<World, string> = {
  atelier: "lejek lejek-atelier",
  glamour: "lejek lejek-glamour",
  wellness: "lejek lejek-wellness",
}

/* ---------- text helpers (all sizes come from --lejek-tekst-*) ---------- */

export function tx(step: number): React.CSSProperties {
  return { fontSize: `var(--lejek-tekst-${step})` }
}

/** Gold uppercase eyebrow — letter-spacing from --lejek-nadtytul-odstep. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn("block font-sans font-semibold uppercase text-accent", className)}
      style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}
    >
      {children}
    </span>
  )
}

/** Serif heading — transform + tracking from world tokens. */
export function H({
  children,
  className,
  as: Tag = "h2",
  size = 11,
}: {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
  size?: number
}) {
  return (
    <Tag
      className={cn("font-serif font-medium leading-tight text-foreground text-balance", className)}
      style={{
        fontSize: `var(--lejek-tekst-${size})`,
        textTransform: "var(--lejek-naglowek-transform)" as React.CSSProperties["textTransform"],
        letterSpacing: "var(--lejek-naglowek-odstep)",
      }}
    >
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
  disabled,
  type = "button",
}: {
  children: React.ReactNode
  variant?: BtnVariant
  full?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
}) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "bg-transparent text-foreground hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius)] px-5 font-sans font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45",
        variant === "outline" && "border-[color:var(--border)]",
        full && "w-full",
        styles[variant],
        className,
      )}
      style={{
        fontSize: "var(--lejek-tekst-6)",
        borderWidth: variant === "outline" ? "var(--lejek-ramka)" : undefined,
      }}
    >
      {children}
    </button>
  )
}

/** Card surface — border width from --lejek-ramka so glamour reads 2px. */
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
        "rounded-[calc(var(--radius)+2px)] border-[color:var(--border)] bg-card p-4 text-left transition-all",
        selected && "border-accent ring-1 ring-accent",
        as === "button" && "w-full cursor-pointer hover:border-accent/60",
        className,
      )}
      style={{ borderWidth: "var(--lejek-ramka)" }}
    >
      {children}
    </Tag>
  )
}

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
    muted: "bg-transparent text-muted-foreground border border-[color:var(--border)]",
    warn: "bg-destructive/12 text-destructive",
  }
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 font-sans font-medium", tones[tone])}
      style={tx(1)}
    >
      {children}
    </span>
  )
}

/** Persistent counter strip: chosen / left / valid-until. */
export function ProgressBadge({ chosen, total, validity }: { chosen: number; total: number; validity: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-secondary/60 px-3.5 py-2.5">
      <span className="font-sans text-foreground" style={tx(4)}>
        Wybrano <span className="font-semibold">{chosen}</span> z {total} · zostało{" "}
        <span className="font-semibold">{total - chosen}</span>
      </span>
      <span className="font-sans text-muted-foreground" style={tx(2)}>
        ważny do {validity}
      </span>
    </div>
  )
}

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
        tone === "warn" ? "border-accent/40 bg-accent/8" : "border-[color:var(--border)] bg-secondary/50",
      )}
    >
      {icon && <span className="mt-0.5 shrink-0 text-accent">{icon}</span>}
      <div className="font-sans leading-relaxed text-foreground" style={tx(4)}>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Funnel chrome — the shared seven-step header + one forward action.  */
/* ------------------------------------------------------------------ */

export interface CartItem {
  label: string
  amount: string
}

export interface ChromeProps {
  device: Device
  /** 1-based current step. */
  step: number
  /** total steps in the rail — 7 normally, 8 for package variant B. */
  totalSteps: number
  /** header title; on step 2 pass the treatment name via `heading` + `price`. */
  heading: string
  price?: string
  /** the labels for the rail ticks (desktop). */
  stepLabels: string[]
  cart: CartItem[]
  cartAmount: string
  lang: "PL" | "EN"
  onLang: () => void
  onBack?: () => void
  actionLabel: string
  onAction?: () => void
  actionDisabled?: boolean
  secondary?: { label: string; onClick: () => void }
  children: React.ReactNode
}

export function FunnelChrome(props: ChromeProps) {
  const { device } = props
  const wide = device === "desktop"
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = props.cart.length

  return (
    <div className="flex h-full flex-col">
      {/* ── header ─────────────────────────────────────────── */}
      <header className="relative shrink-0 border-b border-[color:var(--border)] bg-background">
        {/* row 1 — back · lang (above rail) · cart */}
        <div className="flex items-center justify-between gap-2 px-4 pt-3">
          <button
            type="button"
            onClick={props.onBack}
            disabled={!props.onBack}
            className="inline-flex min-h-9 items-center gap-1 rounded-full px-2 font-sans text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
            style={tx(3)}
            aria-label="Wstecz"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {wide && "Wstecz"}
          </button>

          <div className="flex items-center gap-2">
            {/* language switch — sits above the rail */}
            <div className="flex items-center rounded-full border border-[color:var(--border)]">
              {(["PL", "EN"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={props.lang === l ? undefined : props.onLang}
                  className={cn(
                    "min-h-8 rounded-full px-2.5 font-sans transition-colors",
                    props.lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                  style={tx(1)}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* cart with item count + amount */}
            <button
              type="button"
              onClick={() => setCartOpen((o) => !o)}
              className="relative inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 font-sans text-foreground transition-colors hover:border-accent"
              style={tx(3)}
              aria-label={`Koszyk, pozycje: ${cartCount}, razem ${props.cartAmount}`}
            >
              <ShoppingBag className="size-4 text-accent" aria-hidden />
              <span className="flex size-4 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground" style={tx(1)}>
                {cartCount}
              </span>
              <span className="font-medium">{props.cartAmount}</span>
            </button>
          </div>

          {cartOpen && (
            <div className="absolute right-4 top-full z-30 mt-1 w-64 rounded-[var(--radius)] border border-[color:var(--border)] bg-card p-3 shadow-lg">
              <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
                W koszyku
              </span>
              <ul className="mt-2 flex flex-col gap-2">
                {props.cart.map((item, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-2">
                    <span className="font-sans text-foreground" style={tx(4)}>
                      {item.label}
                    </span>
                    <span className="font-sans font-medium text-foreground" style={tx(4)}>
                      {item.amount}
                    </span>
                  </li>
                ))}
                {cartCount === 0 && (
                  <li className="font-sans text-muted-foreground" style={tx(3)}>
                    Koszyk jest pusty.
                  </li>
                )}
              </ul>
              <div className="mt-2 flex items-baseline justify-between border-t border-[color:var(--border)] pt-2">
                <span className="font-sans text-muted-foreground" style={tx(3)}>
                  Razem
                </span>
                <span className="font-serif text-foreground" style={{ fontSize: "var(--lejek-kwota)" }}>
                  {props.cartAmount}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* row 2 — step rail */}
        <div className="px-4 pt-3">
          {wide ? (
            <ol className="flex items-center gap-1.5">
              {props.stepLabels.map((label, i) => {
                const n = i + 1
                const done = n < props.step
                const current = n === props.step
                return (
                  <li key={i} className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full font-sans font-semibold",
                        current
                          ? "bg-accent text-accent-foreground"
                          : done
                            ? "bg-accent/25 text-accent"
                            : "bg-secondary text-muted-foreground",
                      )}
                      style={tx(1)}
                    >
                      {done ? <Check className="size-3" aria-hidden /> : n}
                    </span>
                    <span
                      className={cn("font-sans", current ? "text-foreground" : "text-muted-foreground")}
                      style={tx(2)}
                    >
                      {label}
                    </span>
                    {i < props.stepLabels.length - 1 && <span className="mx-0.5 h-px w-4 bg-border" aria-hidden />}
                  </li>
                )
              })}
            </ol>
          ) : (
            <div className="flex items-center gap-2" aria-label={`Krok ${props.step} z ${props.totalSteps}`}>
              {props.stepLabels.map((_, i) => {
                const n = i + 1
                const done = n < props.step
                const current = n === props.step
                return (
                  <span
                    key={i}
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all",
                      current ? "size-5 bg-accent text-accent-foreground" : done ? "size-5 bg-accent/25 text-accent" : "size-2 bg-border",
                    )}
                    style={current || done ? tx(1) : undefined}
                  >
                    {done ? <Check className="size-3" aria-hidden /> : current ? n : ""}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* row 3 — title (step 2 shows treatment name + price) */}
        <div className="flex items-end justify-between gap-3 px-4 pb-3 pt-2">
          <H as="h1" size={wide ? 10 : 9} className="min-w-0 truncate">
            {props.heading}
          </H>
          {props.price && (
            <span className="shrink-0 font-serif text-foreground" style={{ fontSize: "var(--lejek-kwota)" }}>
              {props.price}
            </span>
          )}
        </div>
      </header>

      {/* ── scrolling body ─────────────────────────────────── */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{props.children}</div>

      {/* ── footer — exactly one forward action on the right ── */}
      <footer className="shrink-0 border-t border-[color:var(--border)] bg-background px-4 py-3">
        {props.secondary && (
          <button
            type="button"
            onClick={props.secondary.onClick}
            className="mb-2 block w-full font-sans text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            style={tx(3)}
          >
            {props.secondary.label}
          </button>
        )}
        <Btn full onClick={props.onAction} disabled={props.actionDisabled}>
          {props.actionLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
      </footer>
    </div>
  )
}

/** Non-funnel screen (client panel, standalone states) — header + scrolling body + optional action. */
export function PlainShell({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
  action?: { label: string; onClick?: () => void }
}) {
  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 border-b border-[color:var(--border)] bg-background px-4 pb-3 pt-4">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <H as="h1" size={10} className="mt-1.5">
          {title}
        </H>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{children}</div>
      {action && (
        <footer className="shrink-0 border-t border-[color:var(--border)] bg-background px-4 py-3">
          <Btn full onClick={action.onClick}>
            {action.label}
          </Btn>
        </footer>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Device frame — applies the world scope so all tokens resolve inside */
/* ------------------------------------------------------------------ */

export function DeviceFrame({
  world,
  device,
  children,
}: {
  world: World
  device: Device
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        worldClass[world],
        "mx-auto flex w-full flex-col overflow-hidden rounded-[18px] border-[color:var(--border)] bg-background shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]",
        device === "mobile" ? "max-w-[390px]" : "max-w-[820px]",
      )}
      style={{ borderWidth: "var(--lejek-ramka)" }}
    >
      <div className="flex items-center gap-1.5 border-b border-[color:var(--border)] bg-secondary/50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
      </div>
      <div className={cn("h-[660px]", device === "mobile" ? "" : "")}>{children}</div>
    </div>
  )
}
