"use client"

import { CalendarPlus, Check, Clock, PackageOpen, Sparkles } from "lucide-react"
import { panelPackageExpiry, panelPackageFull, type PanelVisit } from "@/lib/pakiety-data"
import { Btn, H, Pill, PlainShell, tx } from "./ui"

function VisitList({ visits }: { visits: PanelVisit[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {visits.map((v) => (
        <div
          key={v.index}
          className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-card px-4 py-3"
          style={{ borderWidth: "var(--lejek-ramka)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full font-sans font-semibold ${
                v.status === "done"
                  ? "bg-secondary text-muted-foreground"
                  : v.status === "booked"
                    ? "bg-primary text-primary-foreground"
                    : "border border-dashed border-foreground/30 text-muted-foreground"
              }`}
              style={tx(2)}
            >
              {v.index}
            </span>
            <div>
              {v.date ? (
                <>
                  <div className="font-sans font-medium text-foreground" style={tx(5)}>
                    {v.date} · {v.time}
                  </div>
                  <div className="font-sans text-muted-foreground" style={tx(2)}>
                    {v.staff}
                  </div>
                </>
              ) : (
                <div className="font-sans text-muted-foreground" style={tx(5)}>
                  Wizyta jeszcze nieumówiona
                </div>
              )}
            </div>
          </div>

          {v.status === "done" && (
            <span className="inline-flex items-center gap-1.5 font-sans text-muted-foreground" style={tx(2)}>
              <Check className="size-3.5" aria-hidden />
              zrealizowana
            </span>
          )}
          {v.status === "booked" && <Pill tone="accent">nadchodząca</Pill>}
          {v.status === "unbooked" && (
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-accent px-3 font-sans font-medium text-accent transition-colors hover:bg-accent/10"
              style={tx(3)}
            >
              <CalendarPlus className="size-3.5" aria-hidden />
              Umów
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/** Client panel — active package with mixed visit states. */
export function PanelFull() {
  const p = panelPackageFull
  return (
    <PlainShell eyebrow="Twoje pakiety" title="Panel klientki">
      <div className="rounded-[calc(var(--radius)+2px)] border border-[color:var(--border)] bg-secondary/50 p-4" style={{ borderWidth: "var(--lejek-ramka)" }}>
        <div className="flex items-start justify-between gap-3">
          <H as="h2" size={9}>{p.name}</H>
          <Pill tone="accent">Zostały {p.remaining}</Pill>
        </div>
        <div className="mt-2 flex items-center gap-1.5 font-sans text-muted-foreground" style={tx(3)}>
          <Clock className="size-3.5" aria-hidden />
          Ważny do {p.validityUntil}
        </div>
      </div>

      <div className="mt-4">
        <VisitList visits={p.visits} />
      </div>

      <p className="mt-4 font-sans leading-relaxed text-muted-foreground" style={tx(3)}>
        Wszystko widzisz tutaj — bez dzwonienia i pytania na recepcji.
      </p>
    </PlainShell>
  )
}

/** Special state — package near expiry with unused visits. Warns, offers action. */
export function PanelExpiry() {
  const p = panelPackageExpiry
  return (
    <PlainShell eyebrow="Twoje pakiety" title="Panel klientki">
      <div className="rounded-[calc(var(--radius)+2px)] border border-accent/50 bg-accent/8 p-4">
        <div className="flex items-start justify-between gap-3">
          <H as="h2" size={9}>{p.name}</H>
          <Pill tone="accent">Zostały {p.remaining}</Pill>
        </div>
        <div className="mt-2 font-sans font-medium text-foreground" style={tx(5)}>
          Wygasa za {p.expiresInDays} dni — do {p.validityUntil}
        </div>
        <p className="mt-1 font-sans leading-relaxed text-muted-foreground" style={tx(3)}>
          Masz 3 niewykorzystane wizyty. Zdążysz je umówić, jeśli zrobisz to w tym tygodniu.
        </p>
      </div>

      <div className="mt-4">
        <VisitList visits={p.visits} />
      </div>

      <div className="mt-5">
        <Btn full>
          <CalendarPlus className="size-4" aria-hidden />
          Umów pozostałe wizyty
        </Btn>
      </div>
    </PlainShell>
  )
}

/** Empty state — client with no package at all. */
export function PanelEmpty({ onStart }: { onStart: () => void }) {
  return (
    <PlainShell eyebrow="Twoje pakiety" title="Panel klientki">
      <div className="flex flex-col items-center rounded-[calc(var(--radius)+2px)] border border-dashed border-[color:var(--border)] bg-card px-6 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-accent">
          <PackageOpen className="size-6" aria-hidden />
        </span>
        <H as="h2" size={9} className="mt-4">Nie masz jeszcze pakietu</H>
        <p className="mt-2 max-w-[34ch] font-sans leading-relaxed text-muted-foreground" style={tx(5)}>
          Pakiet to kilka wizyt tego samego zabiegu kupionych z góry taniej — z terminami umówionymi od razu.
        </p>
        <div className="mt-5 w-full max-w-[16rem]">
          <Btn full onClick={onStart}>
            <Sparkles className="size-4" aria-hidden />
            Zobacz pakiety
          </Btn>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {["Kupujesz kilka wizyt taniej", "Umawiasz wszystkie terminy od razu", "Podgląd wizyt zawsze pod ręką"].map((line) => (
          <div key={line} className="flex items-center gap-2.5 font-sans text-muted-foreground" style={tx(4)}>
            <Check className="size-3.5 shrink-0 text-accent" aria-hidden />
            {line}
          </div>
        ))}
      </div>
    </PlainShell>
  )
}
