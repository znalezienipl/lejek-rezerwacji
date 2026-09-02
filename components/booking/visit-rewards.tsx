import type React from "react"
import { Check } from "lucide-react"

import { designTokens, type ThemeId } from "@/tokens/design-tokens"
import { cn } from "@/lib/utils"
import {
  Label,
  ScreenTitle,
  Surface,
  isUpper,
  type FrameWidth,
  type ScreenDef,
  type VariantDef,
} from "./shared"
import {
  deriveReward,
  rewardStates,
  rewardsProgram,
  type RewardThreshold,
  type RewardView,
} from "@/lib/client-panel-data"

/* ------------------------------------------------------------------ */
/* Polish helpers                                                      */
/* ------------------------------------------------------------------ */

/** wizyta / wizyty / wizyt — correct Polish plural for a visit count. */
function wizyty(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (n === 1) return "wizyta"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "wizyty"
  return "wizyt"
}

/* ------------------------------------------------------------------ */
/* Progress bar — the glanceable element (read without reading numbers) */
/* ------------------------------------------------------------------ */

function RewardTrack({ view, theme }: { view: RewardView; theme: ThemeId }) {
  const organic = designTokens[theme].corners.style === "organic"
  const span = Math.max(view.barTarget - view.barBase, 1)
  const filled = Math.min(view.barFilled, span)
  const target = view.due ?? view.next
  const active = view.status === "due"

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-1">
        {Array.from({ length: span }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-2.5 flex-1 border",
              organic ? "rounded-full" : "rounded-[2px]",
              i < filled ? "border-transparent bg-accent" : "border-border bg-secondary/40",
            )}
          />
        ))}
      </div>
      {target && (
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border px-2.5 py-1 font-sans text-[0.62rem] font-semibold tabular-nums",
            organic ? "rounded-full" : "rounded-[var(--radius)]",
            active
              ? "border-transparent bg-accent text-accent-foreground"
              : "border-accent/60 text-accent",
          )}
        >
          {active && <Check className="size-3" aria-hidden />}
          {target.visit}. · {target.discount}%
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Threshold timeline — passed = history, not an active benefit         */
/* ------------------------------------------------------------------ */

function thresholdRole(t: RewardThreshold, view: RewardView): "passed" | "due" | "next" | "future" {
  if (view.passed.some((p) => p.visit === t.visit)) return "passed"
  if (view.due?.visit === t.visit) return "due"
  if (view.next?.visit === t.visit) return "next"
  return "future"
}

const roleLabel: Record<string, string> = {
  passed: "wykorzystane",
  due: "teraz",
  next: "następna",
  future: "wkrótce",
}

function ThresholdTimeline({
  view,
  theme,
  muted,
}: {
  view: RewardView
  theme: ThemeId
  muted?: boolean
}) {
  const organic = designTokens[theme].corners.style === "organic"
  return (
    <div className="flex flex-wrap gap-2">
      {rewardsProgram.thresholds.map((t) => {
        const role = muted ? "future" : thresholdRole(t, view)
        return (
          <div
            key={t.visit}
            className={cn(
              "flex min-w-[5.5rem] flex-1 flex-col gap-1 border p-2.5",
              organic ? "rounded-[calc(var(--radius)*0.7)]" : "rounded-[var(--radius)]",
              role === "due" && "border-accent bg-accent/10",
              role === "next" && "border-accent/50",
              role === "passed" && "border-border bg-secondary/30",
              (role === "future" || muted) && "border-border",
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "font-sans text-[0.72rem] font-semibold tabular-nums",
                  role === "passed" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {t.visit}. {wizyty(t.visit)}
              </span>
              {role === "passed" && <Check className="size-3.5 text-muted-foreground" aria-hidden />}
            </span>
            <span
              className={cn(
                "font-serif text-lg leading-none",
                role === "passed" ? "text-muted-foreground/70" : role === "future" ? "text-foreground/80" : "text-accent",
              )}
            >
              −{t.discount}%
            </span>
            <span
              className={cn(
                "font-sans text-[0.56rem] uppercase tracking-[0.12em]",
                role === "due" || role === "next" ? "text-accent" : "text-muted-foreground/70",
              )}
            >
              {roleLabel[role]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Status copy                                                          */
/* ------------------------------------------------------------------ */

function statusCopy(view: RewardView): { headline: string; sub: string; tone: "quiet" | "accent" } {
  switch (view.status) {
    case "due":
      return {
        headline: `Twoja najbliższa wizyta będzie ${view.due!.discount}% tańsza.`,
        sub: "Zniżkę naliczymy przy rozliczeniu — nie musisz nic robić.",
        tone: "accent",
      }
    case "close":
      return {
        headline: `Jeszcze jedna wizyta i kolejna będzie ${view.next!.discount}% tańsza.`,
        sub: "Teraz obowiązuje cena podstawowa.",
        tone: "accent",
      }
    case "collecting":
      return {
        headline: `Jeszcze ${view.remaining} ${wizyty(view.remaining)} do zniżki ${view.next!.discount}%.`,
        sub: view.passed.length
          ? `Zniżka ${view.passed[view.passed.length - 1].discount}% już wykorzystana — teraz cena podstawowa.`
          : "Teraz obowiązuje cena podstawowa.",
        tone: "quiet",
      }
    default:
      return { headline: "", sub: "", tone: "quiet" }
  }
}

/* ------------------------------------------------------------------ */
/* Main card                                                            */
/* ------------------------------------------------------------------ */

export function VisitRewards({
  theme,
  visits,
  width,
}: {
  theme: ThemeId
  visits: number
  width: FrameWidth
}) {
  const view = deriveReward(visits)
  const wide = width === "desktop"

  if (view.status === "empty") {
    return (
      <div className={cn(wide && "mx-auto max-w-xl")}>
        <Header theme={theme} />
        <Surface className="mt-4 p-6">
          <p className="font-serif text-xl leading-snug text-foreground text-pretty">
            Licznik ruszy po Twojej pierwszej wizycie na usłudze objętej programem.
          </p>
          <p className="mt-3 font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
            Liczymy {rewardsProgram.coveredLabel.toLowerCase()}. Przy 6., 12. i kolejnych wizytach ta wizyta
            jest tańsza — bez pośpiechu i bez terminów.
          </p>
          <div className="mt-6">
            <Label theme={theme} className="mb-2 block">
              Progi zniżek
            </Label>
            <ThresholdTimeline view={view} theme={theme} muted />
          </div>
        </Surface>
        <Covered theme={theme} />
      </div>
    )
  }

  const copy = statusCopy(view)

  return (
    <div className={cn(wide && "mx-auto max-w-xl")}>
      <Header theme={theme} />

      <Surface
        className={cn("mt-4 p-6", (view.status === "due" || view.status === "close") && "border-accent/60")}
      >
        {/* count — present but secondary to the bar */}
        <div className="flex items-end justify-between gap-4">
          <span className="flex items-baseline gap-2">
            <span className="font-serif text-5xl leading-none text-foreground tabular-nums">
              {view.visits}
            </span>
            <span className="font-sans text-sm text-muted-foreground">{wizyty(view.visits)}</span>
          </span>
          {view.status === "due" && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap border border-transparent bg-accent px-2.5 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent-foreground",
                designTokens[theme].corners.style === "organic" ? "rounded-full" : "rounded-[var(--radius)]",
              )}
            >
              Zniżka należna
            </span>
          )}
        </div>

        {/* status sentence */}
        <p
          className={cn(
            "mt-4 font-serif leading-snug text-pretty",
            view.status === "due" ? "text-xl text-foreground" : "text-lg",
            copy.tone === "accent" && view.status !== "due" ? "text-foreground" : "text-foreground",
          )}
        >
          {copy.headline}
        </p>
        <p className="mt-1.5 font-sans text-[0.78rem] leading-relaxed text-muted-foreground">{copy.sub}</p>

        {/* glanceable progress */}
        <div className="mt-5">
          <RewardTrack view={view} theme={theme} />
        </div>

        {/* history + upcoming thresholds */}
        <div className="mt-6 border-t border-border pt-5">
          <Label theme={theme} className="mb-2.5 block">
            Progi zniżek
          </Label>
          <ThresholdTimeline view={view} theme={theme} />
        </div>
      </Surface>

      <Covered theme={theme} />
    </div>
  )
}

function Header({ theme }: { theme: ThemeId }) {
  return (
    <div>
      <Label theme={theme}>Wizyty i zniżki</Label>
      <ScreenTitle theme={theme} as="h3" className={cn("mt-1.5 text-2xl", isUpper(theme) && "text-xl")}>
        {rewardsProgram.clientName}
      </ScreenTitle>
    </div>
  )
}

function Covered({ theme }: { theme: ThemeId }) {
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-1.5 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
      <span className="text-foreground">Liczą się {rewardsProgram.coveredLabel.toLowerCase()}.</span>
      <span>{rewardsProgram.coveredNote}</span>
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* VariantDef — five states, each shown mobile + desktop                */
/* ------------------------------------------------------------------ */

const screens: ScreenDef[] = rewardStates.map((state) => ({
  title: state.label,
  render: (theme: ThemeId, width: FrameWidth): React.ReactNode => (
    <VisitRewards theme={theme} visits={state.visits} width={width} />
  ),
}))

export const visitRewardsDef: VariantDef = {
  id: "rewards",
  name: "Visit discounts",
  approach: "One visit counter · percentage off at milestones",
  description:
    "The salon counts visits across every covered service, not stamps per treatment. At set visit numbers that one visit is cheaper by a percentage, then the count carries on toward the next milestone. Passed milestones read as history; the client never taps anything — the salon applies the discount at checkout.",
  screens,
}
