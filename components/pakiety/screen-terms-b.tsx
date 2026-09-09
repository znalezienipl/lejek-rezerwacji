"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { proposedVisits } from "@/lib/pakiety-data"
import { Btn, Eyebrow, H, ProgressBadge, ScreenBody, StepDots } from "./ui"

/** Variant B — one visit per screen, four steps, progress bar. */
export function ScreenTermsB({
  device,
  onNext,
  onOnlyFirst,
}: {
  device: "mobile" | "desktop"
  onNext: () => void
  onOnlyFirst: () => void
}) {
  const wide = device === "desktop"
  const [step, setStep] = useState(0)
  // Which alternative slot is picked on each step (index into alternatives).
  const [picks, setPicks] = useState<number[]>([1, 1, 1, 1])

  const visit = proposedVisits[step]
  const last = step === proposedVisits.length - 1

  return (
    <ScreenBody wide={wide}>
      <div className="flex items-center justify-between gap-3">
        <Eyebrow>Wariant B · kreator</Eyebrow>
        <span className="font-sans text-[0.68rem] text-muted-foreground">
          Krok {step + 1} z {proposedVisits.length}
        </span>
      </div>

      <div className="mt-3">
        <StepDots step={step} total={proposedVisits.length} />
      </div>

      <H as="h1" className="mt-4 text-[1.5rem]">
        Wizyta {visit.index} — wybierz termin
      </H>
      <p className="mt-2 font-sans text-[0.78rem] leading-relaxed text-muted-foreground">
        Rytm co 4 tygodnie. Proponujemy okolice {visit.date}.
      </p>

      <div className="mt-4">
        <ProgressBadge chosen={step + 1} total={4} validity="8 stycznia 2026" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {visit.alternatives.map((alt, idx) => {
          const active = picks[step] === idx
          return (
            <button
              key={alt.id}
              type="button"
              onClick={() => setPicks((prev) => prev.map((p, i) => (i === step ? idx : p)))}
              className={`flex min-h-14 items-center justify-between gap-3 rounded-[calc(var(--radius)+2px)] border px-4 text-left transition-colors ${
                active ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
              }`}
            >
              <span className="flex flex-col">
                <span className="font-sans text-[0.86rem] font-medium text-foreground">
                  {alt.date} · {alt.time}
                </span>
                <span className="font-sans text-[0.7rem] text-muted-foreground">
                  {alt.day} · {alt.staff}
                </span>
              </span>
              {active && <Check className="size-4 shrink-0 text-accent" aria-hidden />}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <Btn variant="outline" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="size-4" aria-hidden />
            Wstecz
          </Btn>
        )}
        <Btn full onClick={() => (last ? onNext() : setStep((s) => s + 1))}>
          {last ? "Dalej — podsumowanie" : "Następna wizyta"}
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
      </div>

      {step === 0 && (
        <button
          type="button"
          onClick={onOnlyFirst}
          className="mt-3 min-h-11 w-full font-sans text-[0.74rem] text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
        >
          Umów tylko tę wizytę, resztę wybiorę później
        </button>
      )}
    </ScreenBody>
  )
}
