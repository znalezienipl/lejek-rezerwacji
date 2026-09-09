"use client"

import { ArrowRight, CalendarClock, CalendarX, Info } from "lucide-react"
import { offRhythmFallbacks, overflowVisits } from "@/lib/pakiety-data"
import { Btn, Note, Pill, PlainShell, tx } from "./ui"

/**
 * Special state 1 — the package can't fit inside its validity.
 * Shows the arithmetic, not a verdict. Warns, never blocks.
 */
export function StateValidity({ onBuyAnyway }: { onBuyAnyway: () => void }) {
  return (
    <PlainShell eyebrow="Stan · ważność" title="Pakiet 6 wizyt — Kobido">
      <Note icon={<Info className="size-4" aria-hidden />}>
        6 wizyt co 4 tygodnie to około <span className="font-semibold">140 dni</span>. Pakiet ważny{" "}
        <span className="font-semibold">90 dni</span>. Dwie ostatnie wizyty wypadają po terminie — możesz kupić mimo to i umówić je gęściej.
      </Note>

      <div className="mt-4 flex flex-col gap-2">
        {overflowVisits.map((v) => (
          <div
            key={v.index}
            className={`flex items-center justify-between gap-3 rounded-[var(--radius)] border px-4 py-3 ${v.within ? "border-[color:var(--border)] bg-card" : "border-accent/40 bg-accent/8"}`}
            style={{ borderWidth: "var(--lejek-ramka)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full font-sans font-semibold ${v.within ? "bg-primary text-primary-foreground" : "bg-accent/25 text-foreground"}`}
                style={tx(2)}
              >
                {v.index}
              </span>
              <span className="font-sans text-foreground" style={tx(5)}>{v.date}</span>
            </div>
            {v.within ? (
              <span className="font-sans text-muted-foreground" style={tx(2)}>w ważności</span>
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
        <Btn variant="outline" full>Wybierz mniejszy pakiet</Btn>
      </div>
    </PlainShell>
  )
}

/**
 * Special state 2 — no free slots inside the rhythm window.
 * Honest situation plus off-rhythm fallbacks, never a dead end.
 */
export function StateNoTerms({ onOnlyFirst }: { onOnlyFirst: () => void }) {
  return (
    <PlainShell eyebrow="Stan · brak terminów" title="Wizyta 2 — brak terminu w rytmie">
      <div className="rounded-[calc(var(--radius)+2px)] border border-[color:var(--border)] bg-secondary/50 px-4 py-6 text-center" style={{ borderWidth: "var(--lejek-ramka)" }}>
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground">
          <CalendarX className="size-5" aria-hidden />
        </span>
        <p className="mx-auto mt-3 max-w-[38ch] font-sans leading-relaxed text-foreground" style={tx(5)}>
          W oknie 4 tygodni (koniec listopada) nie mamy wolnego terminu. Nie chcemy proponować daty, której nie ma.
        </p>
      </div>

      <p className="mt-5 font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
        Najbliższe możliwe, poza rytmem
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {offRhythmFallbacks.map((s) => (
          <button
            key={s.id}
            type="button"
            className="flex min-h-14 items-center justify-between gap-3 rounded-[calc(var(--radius)+2px)] border border-[color:var(--border)] bg-card px-4 text-left transition-colors hover:border-accent/50"
            style={{ borderWidth: "var(--lejek-ramka)" }}
          >
            <span className="flex flex-col">
              <span className="font-sans font-medium text-foreground" style={tx(5)}>{s.date} · {s.time}</span>
              <span className="font-sans text-muted-foreground" style={tx(3)}>{s.day} · {s.staff}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" aria-hidden />
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Note icon={<CalendarClock className="size-4" aria-hidden />} tone="info">
          Możesz też umówić tylko wcześniejsze wizyty, a tę zostawić na później — przypomnimy, gdy zwolni się termin.
        </Note>
        <button
          type="button"
          onClick={onOnlyFirst}
          className="mt-3 min-h-11 w-full font-sans text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          style={tx(4)}
        >
          Umów pozostałe teraz, tę wizytę później
        </button>
      </div>
    </PlainShell>
  )
}

/**
 * Special state 3 — booked 2 of 4 and left the funnel.
 * The package is bought; the rest waits in the panel. Nothing lost silently.
 */
export function StateExit({ onGoPanel }: { onGoPanel: () => void }) {
  return (
    <PlainShell eyebrow="Stan · przerwana rezerwacja" title="Pakiet jest Twój — reszta poczeka">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-card px-4 py-3" style={{ borderWidth: "var(--lejek-ramka)" }}>
          <span className="font-sans text-foreground" style={tx(5)}>Umówione teraz</span>
          <Pill tone="accent">2 z 4</Pill>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-dashed border-[color:var(--border)] bg-card px-4 py-3">
          <span className="font-sans text-muted-foreground" style={tx(5)}>Do umówienia</span>
          <Pill tone="muted">2 wizyty</Pill>
        </div>
      </div>

      <div className="mt-4">
        <Note icon={<Info className="size-4" aria-hidden />} tone="info">
          Zapłaciłaś za cały pakiet, więc dwie pozostałe wizyty czekają na Ciebie w panelu. Umówisz je w dowolnym momencie, zanim pakiet wygaśnie — <span className="font-semibold">8 stycznia 2026</span>.
        </Note>
      </div>

      <div className="mt-6">
        <Btn full onClick={onGoPanel}>
          Przejdź do panelu
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
      </div>
    </PlainShell>
  )
}
