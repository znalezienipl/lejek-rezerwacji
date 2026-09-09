"use client"

import { useState } from "react"
import { ArrowRight, Check, Pencil } from "lucide-react"
import { proposedVisits, type SlotOption } from "@/lib/pakiety-data"
import { Btn, Eyebrow, H, Pill, ProgressBadge, ScreenBody } from "./ui"

/** Variant A — all four dates on one screen, each editable in place. */
export function ScreenTermsA({
  device,
  onNext,
  onOnlyFirst,
}: {
  device: "mobile" | "desktop"
  onNext: () => void
  onOnlyFirst: () => void
}) {
  const wide = device === "desktop"
  // Selected slot per visit — starts on the proposed rhythm date (pure display state).
  const [chosen, setChosen] = useState<SlotOption[]>(
    proposedVisits.map((v) => ({ id: `v${v.index}-default`, day: v.day, date: v.date, time: v.time, staff: v.staff })),
  )
  const [editing, setEditing] = useState<number | null>(null)

  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Wariant A · lista</Eyebrow>
      <H as="h1" className="mt-2 text-[1.55rem]">
        Cztery terminy w rytmie zabiegu
      </H>
      <p className="mt-2 font-sans text-[0.78rem] leading-relaxed text-muted-foreground">
        Proponujemy daty co 4 tygodnie. Każdą możesz zmienić osobno.
      </p>

      <div className="mt-4">
        <ProgressBadge chosen={4} total={4} validity="8 stycznia 2026" />
      </div>

      <div className={`mt-4 flex flex-col gap-3 ${wide ? "sm:grid sm:grid-cols-2" : ""}`}>
        {proposedVisits.map((visit, i) => {
          const sel = chosen[i]
          const isEditing = editing === visit.index
          return (
            <div key={visit.index} className="rounded-[calc(var(--radius)+2px)] border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.72rem] font-semibold text-primary-foreground">
                    {visit.index}
                  </span>
                  <div>
                    <div className="font-sans text-[0.86rem] font-medium text-foreground">
                      {sel.date} · {sel.time}
                    </div>
                    <div className="font-sans text-[0.7rem] text-muted-foreground">
                      {sel.day} · {sel.staff}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing(isEditing ? null : visit.index)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 font-sans text-[0.68rem] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Pencil className="size-3" aria-hidden />
                  {isEditing ? "Zamknij" : "Zmień"}
                </button>
              </div>

              {isEditing && (
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                  {visit.alternatives.map((alt) => {
                    const active = sel.date === alt.date && sel.time === alt.time
                    return (
                      <button
                        key={alt.id}
                        type="button"
                        onClick={() => {
                          setChosen((prev) => prev.map((c, idx) => (idx === i ? alt : c)))
                          setEditing(null)
                        }}
                        className={`flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius)] border px-3 text-left transition-colors ${
                          active ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                        }`}
                      >
                        <span className="font-sans text-[0.76rem] text-foreground">
                          {alt.date} · {alt.time}
                        </span>
                        <span className="flex items-center gap-2 font-sans text-[0.68rem] text-muted-foreground">
                          {alt.staff}
                          {active && <Check className="size-3.5 text-accent" aria-hidden />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Btn full onClick={onNext}>
          Dalej — podsumowanie
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
        <button
          type="button"
          onClick={onOnlyFirst}
          className="min-h-11 font-sans text-[0.74rem] text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
        >
          Umów tylko pierwszą wizytę, resztę wybiorę później
        </button>
      </div>
    </ScreenBody>
  )
}
