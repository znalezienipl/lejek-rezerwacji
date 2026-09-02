import { ArrowRight, Check, Loader2, Tag as TagIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import { Btn, Duration, Label, Money, ScreenTitle, Surface, TimeRange, type VariantDef } from "./shared"

/* ------------------------------------------------------------------ */
/* Promo code — extension of booking step 07 (summary).                */
/* Static mockup, no logic. Six states of one quiet, optional field    */
/* that sits UNDER the visit recap and ABOVE the confirm button.       */
/*                                                                      */
/* Rules honoured:                                                      */
/*  · collapsed by default — most clients have no code                  */
/*  · never blocks confirmation, never implies a code is needed         */
/*  · no code list, no hints, no countdowns, no confetti/animation      */
/*  · a wrong code is a typo, not a system error — no alarm red         */
/*  · this is a salon, not a shop — no big % font, no "PROMO" badge     */
/*                                                                      */
/* Data: Masaż twarzy Kobido · 170 zł · code JESIEN10 · −10% · 153 zł   */
/* Copy is Polish, plain-spoken.                                        */
/* ------------------------------------------------------------------ */

/**
 * One field, two kinds of code. The system recognises the type on its own:
 *  · "accepted"  → a discount code (4a) — this visit gets cheaper
 *  · "referral"  → a referral code (4b) — this visit's price is UNCHANGED,
 *                  both people get a credit toward their NEXT visit
 * The client never picks a type and never needs to know which she holds.
 */
type PromoState =
  | "collapsed"
  | "empty"
  | "checking"
  | "accepted"
  | "referral"
  | "invalid"
  | "not-applicable"

const SERVICE = {
  name: "Masaż twarzy Kobido",
  from: "14:30",
  to: "15:40",
  duration: "70 min",
  price: "170 zł",
}

/* -- the input as it looks statically, with an optional filled value -- */
function PromoInput({
  theme,
  value,
  disabled,
}: {
  theme: ThemeId
  value?: string
  disabled?: boolean
}) {
  return (
    <span
      className={cn(
        "flex h-11 min-w-0 flex-1 items-center rounded-[var(--radius)] border bg-background px-3.5 font-sans text-[0.82rem]",
        value ? "border-input text-foreground" : "border-input text-muted-foreground/60",
        disabled && "opacity-70",
      )}
    >
      {value ?? "Wpisz kod"}
      {!value && <span aria-hidden className="ml-0.5 h-4 w-px bg-foreground/40" />}
    </span>
  )
}

/* -- "Zastosuj" button; inactive until something is typed -- */
function ApplyButton({ active, busy }: { active?: boolean; busy?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[var(--radius)] px-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em]",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-transparent text-muted-foreground/50",
      )}
    >
      {busy && <Loader2 className="size-3.5 animate-spin" aria-hidden />}
      {busy ? "Sprawdzam" : "Zastosuj"}
    </span>
  )
}

/**
 * The promo block for a given state. Everything above the confirm button.
 * Kept deliberately quiet — a link, or a field, never a headline.
 */
function PromoBlock({ theme, state }: { theme: ThemeId; state: PromoState }) {
  if (state === "collapsed") {
    return (
      <span className="inline-flex items-center gap-2 font-sans text-[0.76rem] text-foreground underline decoration-border underline-offset-4">
        <TagIcon className="size-3.5 text-accent" aria-hidden />
        Masz kod?
      </span>
    )
  }

  if (state === "accepted") {
    // 4a — discount code. Field is gone; the code now lives in the summary line above.
    return (
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-sans text-[0.76rem] text-foreground">
          <Check className="size-3.5 text-accent" aria-hidden />
          Kod <span className="font-medium">JESIEN10</span> dodany
        </span>
        <span className="shrink-0 font-sans text-[0.7rem] text-muted-foreground underline decoration-border underline-offset-4">
          Usuń
        </span>
      </div>
    )
  }

  if (state === "referral") {
    // 4b — referral code. This visit's price does NOT change; the reward is a
    // credit toward the next visit for both people. Stated plainly, no fanfare.
    return (
      <div className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-start gap-2 font-sans text-[0.76rem] leading-relaxed text-foreground">
          <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
          <span>
            Kod od Ani — Ty i Ania dostaniecie po <span className="font-medium">15 zł</span> zniżki na następną
            wizytę.
          </span>
        </span>
        <span className="mt-0.5 shrink-0 font-sans text-[0.7rem] text-muted-foreground underline decoration-border underline-offset-4">
          Usuń
        </span>
      </div>
    )
  }

  // empty · checking · invalid · not-applicable all show the field row.
  const value =
    state === "invalid" ? "JESIEN1O" : state === "not-applicable" || state === "checking" ? "JESIEN10" : undefined
  const active = state === "checking" || state === "invalid" || state === "not-applicable"

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <PromoInput theme={theme} value={value} disabled={state === "checking"} />
        <ApplyButton active={active} busy={state === "checking"} />
      </div>

      {state === "invalid" && (
        <p className="mt-2.5 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
          Nie znamy tego kodu. Sprawdź pisownię.
        </p>
      )}

      {state === "not-applicable" && (
        <p className="mt-2.5 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
          Ten kod nie obejmuje masażu twarzy Kobido. Dotyczy zabiegów na ciało.
        </p>
      )}
    </div>
  )
}

/**
 * Full step-07 frame. The single treatment, the total (plain, or discounted
 * when accepted), the promo block, then the confirm button.
 */
function PromoSummaryScreen({ theme, state }: { theme: ThemeId; state: PromoState }) {
  const accepted = state === "accepted"
  return (
    <div className="flex min-h-[600px] flex-col bg-background">
      <div className="border-b border-border px-5 py-4 @2xl:px-8 @2xl:py-5">
        <Label theme={theme}>Krok 07 · Podsumowanie</Label>
        <ScreenTitle theme={theme} className="mt-0.5 text-lg @2xl:text-xl">
          Sprawdź swoją rezerwację
        </ScreenTitle>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 @2xl:px-8">
        <div className="flex flex-col gap-5">
          {/* date + salon time */}
          <Surface muted className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Label theme={theme}>Termin</Label>
              <span className="mt-0.5 block font-serif text-base text-foreground">wtorek, 12 marca</span>
            </div>
            <div className="text-right">
              <Label theme={theme}>W salonie</Label>
              <span className="mt-0.5 block font-serif text-base text-foreground">14:30 – 15:40</span>
            </div>
          </Surface>

          {/* the single treatment */}
          <div>
            <Label theme={theme}>Zabieg</Label>
            <div className="mt-2.5 divide-y divide-border border-y border-border">
              <div className="flex flex-col gap-2 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.58rem] font-semibold text-primary-foreground">
                    1
                  </span>
                  <span className="min-w-0 flex-1 truncate font-sans text-[0.82rem] font-medium text-foreground">
                    {SERVICE.name}
                  </span>
                  <Money className="shrink-0 text-[0.85rem]">{SERVICE.price}</Money>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-8">
                  <TimeRange from={SERVICE.from} to={SERVICE.to} />
                  <Duration>{SERVICE.duration}</Duration>
                </div>
              </div>
            </div>
          </div>

          {/* total — plain, or discounted once the code is accepted */}
          {accepted ? (
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between font-sans text-[0.74rem]">
                <span className="text-muted-foreground">Cena zabiegu</span>
                <span className="text-muted-foreground">170 zł</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between font-sans text-[0.74rem]">
                <span className="text-muted-foreground">Rabat jesienny · JESIEN10</span>
                <span className="text-foreground">−17 zł</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <Label theme={theme}>Razem</Label>
                <span className="flex items-baseline gap-2.5">
                  <span className="font-serif text-sm text-muted-foreground line-through">170 zł</span>
                  <Money className="text-xl">153 zł</Money>
                </span>
              </div>
              <p className="mt-1.5 text-right font-sans text-[0.68rem] text-muted-foreground">
                Rabat jesienny (−10%)
              </p>
            </div>
          ) : (
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <Label theme={theme}>Razem</Label>
              <Money className="text-xl">170 zł</Money>
            </div>
          )}
        </div>

        {/* --- the promo block: under the recap, above the button --- */}
        <div className="mt-6">
          <PromoBlock theme={theme} state={state} />
        </div>

        {/* confirm — always available, never gated on a code */}
        <div className="mt-6 pt-2">
          <Btn full>
            Potwierdź rezerwację
            <ArrowRight className="size-3.5" aria-hidden />
          </Btn>
        </div>
      </div>
    </div>
  )
}

export const promoCodeDef: VariantDef = {
  id: "promo",
  name: "Promo Code",
  approach: "A quiet, optional field on step 07 · collapsed by default",
  description:
    "An extension of the booking summary. Most clients have no code, so it stays a single quiet link until tapped — never an open field that makes people feel they are missing out. It never gates confirmation, never lists codes, and a wrong code is treated as a typo, not a system failure. Once applied, the original price is struck through, the discounted price is clear, and the discount is named beneath — no giant percentages, no shop-style badges.",
  screens: [
    { title: "1 · Zwinięte", render: (theme) => <PromoSummaryScreen theme={theme} state="collapsed" /> },
    { title: "2 · Rozwinięte, puste", render: (theme) => <PromoSummaryScreen theme={theme} state="empty" /> },
    { title: "3 · Sprawdzanie", render: (theme) => <PromoSummaryScreen theme={theme} state="checking" /> },
    { title: "4a · Przyjęty · kod rabatowy", render: (theme) => <PromoSummaryScreen theme={theme} state="accepted" /> },
    { title: "4b · Przyjęty · kod polecający", render: (theme) => <PromoSummaryScreen theme={theme} state="referral" /> },
    { title: "5 · Nieprawidłowy", render: (theme) => <PromoSummaryScreen theme={theme} state="invalid" /> },
    {
      title: "6 · Nie dotyczy tej wizyty",
      render: (theme) => <PromoSummaryScreen theme={theme} state="not-applicable" />,
    },
  ],
}
