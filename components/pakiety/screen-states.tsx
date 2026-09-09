"use client"

import { ArrowRight, CalendarClock, CalendarX, Info } from "lucide-react"
import { offRhythmFallbacks, overflowVisits } from "@/lib/pakiety-data"
import { Btn, Eyebrow, H, Note, Pill, ScreenBody } from "./ui"

/**
 * Special state 1 — the package can't fit inside its validity.
 * Shows the arithmetic, not a verdict. Warns, never blocks — she can still buy.
 */
export function StateValidity({ device, onBuyAnyway }: { device: "mobile" | "desktop"; onBuyAnyway: () => void }) {
  const wide = device === "desktop"
  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Wariant A · lista</Eyebrow>
      <H as="h1" className="mt-2 text-[1.5rem]">
        Pakiet 6 wizyt — Kobido
      </H>

      <div className="mt-4">
        <Note icon={<Info className="size-4" aria-hidden />}>
          6 wizyt co 4 tygodnie to około <span className="font-semibold">140 dni</span>. Pakiet ważny{" "}
          <span className="font-semibold">90 dni</span>. Dwie ostatnie wizyty wypadają po terminie — możesz kupić mimo
          to i umówić je gęściej.
        </Note>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {overflowVisits.map((v) => (
          <div
            key={v.index}
            className={`flex items-center justify-between gap-3 rounded-[var(--radius)] border px-4 py-3 ${
              v.within ? "border-border bg-card" : "border-accent/40 bg-accent/8"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full font-sans text-[0.72rem] font-semibold ${
                  v.within ? "bg-primary text-primary-foreground" : "bg-accent/25 text-foreground"
                }`}
              >
                {v.index}
              </span>
              <span className="font-sans text-[0.84rem] text-foreground">{v.date}</span>
            </div>
            {v.within ? (
              <span className="font-sans text-[0.68rem] text-muted-foreground">w ważności</span>
            ) : (
              <Pill tone="accent">po terminie ważności</Pill>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Btn full onClick={onBuyAnyway}>
          Kupuję mimo to
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
        <Btn variant="outline" full>
          Wybierz mniejszy pakiet
        </Btn>
      </div>
    </ScreenBody>
  )
}

/**
 * Special state 2 — no free slots inside the rhythm window.
 * She sees the honest situation plus off-rhythm fallbacks, never a dead end.
 */
export function StateNoTerms({ device, onOnlyFirst }: { device: "mobile" | "desktop"; onOnlyFirst: () => void }) {
  const wide = device === "desktop"
  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Wariant A · lista</Eyebrow>
      <H as="h1" className="mt-2 text-[1.5rem]">
        Wizyta 2 — brak terminu w rytmie
      </H>

      <div className="mt-4 rounded-[calc(var(--radius)+2px)] border border-border bg-secondary/50 px-4 py-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground">
          <CalendarX className="size-5" aria-hidden />
        </span>
        <p className="mx-auto mt-3 max-w-[38ch] font-sans text-[0.78rem] leading-relaxed text-foreground">
          W oknie 4 tygodni (koniec listopada) nie mamy wolnego terminu. Nie chcemy proponować daty, której nie ma.
        </p>
      </div>

      <p className="mt-5 font-sans text-[0.72rem] font-semibold uppercase tracking-wide text-muted-foreground">
        Najbliższe możliwe, poza rytmem
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {offRhythmFallbacks.map((s) => (
          <button
            key={s.id}
            type="button"
            className="flex min-h-14 items-center justify-between gap-3 rounded-[calc(var(--radius)+2px)] border border-border bg-card px-4 text-left transition-colors hover:border-accent/50"
          >
            <span className="flex flex-col">
              <span className="font-sans text-[0.84rem] font-medium text-foreground">
                {s.date} · {s.time}
              </span>
              <span className="font-sans text-[0.7rem] text-muted-foreground">
                {s.day} · {s.staff}
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" aria-hidden />
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Note icon={<CalendarClock className="size-4" aria-hidden />} tone="info">
          Możesz też umówić tylko wcześniejsze wizyty, a tę zostawić na później — przypomnimy, gdy zwolni się termin.
        </Note>
        <div className="mt-3">
          <button
            type="button"
            onClick={onOnlyFirst}
            className="min-h-11 w-full font-sans text-[0.74rem] text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            Umów pozostałe teraz, tę wizytę później
          </button>
        </div>
      </div>
    </ScreenBody>
  )
}

/**
 * Special state 3 — she booked 2 of 4 and leaves the funnel.
 * The package is bought; the rest waits in the panel. Nothing is lost silently.
 */
export function StateExit({ device, onGoPanel }: { device: "mobile" | "desktop"; onGoPanel: () => void }) {
  const wide = device === "desktop"
  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Przerwana rezerwacja</Eyebrow>
      <H as="h1" className="mt-2 text-[1.5rem]">
        Pakiet jest Twój — reszta poczeka
      </H>

      <div className="mt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-border bg-card px-4 py-3">
          <span className="font-sans text-[0.82rem] text-foreground">Umówione teraz</span>
          <Pill tone="accent">2 z 4</Pill>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-dashed border-border bg-card px-4 py-3">
          <span className="font-sans text-[0.82rem] text-muted-foreground">Do umówienia</span>
          <Pill tone="muted">2 wizyty</Pill>
        </div>
      </div>

      <div className="mt-4">
        <Note icon={<Info className="size-4" aria-hidden />} tone="info">
          Zapłaciłaś za cały pakiet, więc dwie pozostałe wizyty czekają na Ciebie w panelu. Umówisz je w dowolnym
          momencie, zanim pakiet wygaśnie — <span className="font-semibold">8 stycznia 2026</span>.
        </Note>
      </div>

      <div className="mt-6">
        <Btn full onClick={onGoPanel}>
          Przejdź do panelu
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
      </div>
    </ScreenBody>
  )
}
