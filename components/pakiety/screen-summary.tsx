"use client"

import { ArrowRight, CalendarClock, Check, MapPin } from "lucide-react"
import { proposedVisits, purchasedPackage } from "@/lib/pakiety-data"
import { Btn, Eyebrow, H, Note, Pill, ScreenBody } from "./ui"

/**
 * Screen 3 — summary before confirmation.
 * `onlyFirst` shows the conscious "only visit 1 now" variant.
 */
export function ScreenSummary({
  device,
  onlyFirst,
  onConfirm,
}: {
  device: "mobile" | "desktop"
  onlyFirst: boolean
  onConfirm: () => void
}) {
  const wide = device === "desktop"

  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Podsumowanie</Eyebrow>
      <H as="h1" className="mt-2 text-[1.6rem]">
        {purchasedPackage.name}
      </H>

      <div className="mt-4 flex flex-col gap-2.5">
        {proposedVisits.map((v) => {
          const scheduled = !onlyFirst || v.index === 1
          return (
            <div
              key={v.index}
              className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-border bg-card px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.72rem] font-semibold text-primary-foreground">
                  {v.index}
                </span>
                {scheduled ? (
                  <div>
                    <div className="font-sans text-[0.84rem] font-medium text-foreground">
                      {v.date} · {v.time}
                    </div>
                    <div className="font-sans text-[0.7rem] text-muted-foreground">
                      {v.day} · {v.staff}
                    </div>
                  </div>
                ) : (
                  <span className="font-sans text-[0.8rem] text-muted-foreground">Termin do wybrania później</span>
                )}
              </div>
              {scheduled ? (
                <Pill tone="accent">umówiona</Pill>
              ) : (
                <Pill tone="muted">później</Pill>
              )}
            </div>
          )
        })}
      </div>

      {onlyFirst && (
        <div className="mt-4">
          <Note icon={<CalendarClock className="size-4" aria-hidden />}>
            Umawiasz teraz tylko pierwszą wizytę. Pozostałe trzy zostają w pakiecie — dokończysz je w panelu, zanim
            pakiet wygaśnie.
          </Note>
        </div>
      )}

      <div className="mt-5 rounded-[calc(var(--radius)+2px)] border border-border bg-secondary/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-sans text-[0.82rem] text-foreground">Razem</span>
          <span className="font-serif text-xl text-foreground">{purchasedPackage.total}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-2">
          <span className="font-sans text-[0.72rem] text-muted-foreground">Ważność pakietu</span>
          <span className="font-sans text-[0.72rem] text-foreground">do {purchasedPackage.validityUntil}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 font-sans text-[0.74rem] text-muted-foreground">
        <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
        Płatność w salonie — online jeszcze nie prowadzimy.
      </div>

      <div className="mt-6">
        <Btn full onClick={onConfirm}>
          Potwierdź rezerwację
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
        <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-[0.68rem] text-muted-foreground">
          <Check className="size-3.5 text-accent" aria-hidden />
          Potwierdzenie wyślemy SMS-em i e-mailem
        </p>
      </div>
    </ScreenBody>
  )
}
