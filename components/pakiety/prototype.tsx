"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { DeviceFrame } from "./ui"
import { ScreenService } from "./screen-service"
import { ScreenTermsA } from "./screen-terms-a"
import { ScreenTermsB } from "./screen-terms-b"
import { ScreenSummary } from "./screen-summary"
import { PanelEmpty, PanelExpiry, PanelFull } from "./screen-panel"
import { StateExit, StateNoTerms, StateValidity } from "./screen-states"

type View =
  | "service"
  | "termsA"
  | "termsB"
  | "summary"
  | "panelFull"
  | "panelEmpty"
  | "stateValidity"
  | "stateNoTerms"
  | "stateExit"
  | "panelExpiry"

type Device = "mobile" | "desktop"

interface Annotation {
  assumes: string
  loses: string
}

const annotations: Record<View, Annotation> = {
  service: {
    assumes: "Pojedyncza wizyta jest domyślna, a pakiet to spokojna oferta obok — nie nachalny up-sell.",
    loses: "Rezygnuje z mocniejszej sprzedaży: nie krzyczy oszczędnością ani pilnością, więc część klientek pakietu nie zauważy.",
  },
  termsA: {
    assumes: "Klientka chce widzieć wszystkie cztery daty naraz i panować nad całością rytmu.",
    loses: "Na małym ekranie cztery edytowalne wiersze bywają gęste — więcej do ogarnięcia w jednym widoku.",
  },
  termsB: {
    assumes: "Jedna decyzja na ekran jest łatwiejsza i mniej przytłacza niż lista.",
    loses: "Znika widok całości — trudniej ocenić odstępy między wizytami bez cofania się między krokami.",
  },
  summary: {
    assumes: "Przed potwierdzeniem klientka chce zobaczyć komplet: daty, osoby, cenę, ważność i sposób płatności.",
    loses: "To najdłuższy ekran w ścieżce — świadomie rezygnujemy ze zwięzłości na rzecz pewności.",
  },
  panelFull: {
    assumes: "Klientka chce znać stan pakietu sama, bez pytania na recepcji czy zaglądania do segregatora.",
    loses: "To widok obsługowy, nie sprzedażowy — nie promuje kolejnych zakupów.",
  },
  panelEmpty: {
    assumes: "Pusty panel to moment, by wyjaśnić czym jest pakiet, i dać jedno spokojne zaproszenie.",
    loses: "Dla klientki bez historii jest z definicji chudy — mało treści do pokazania.",
  },
  stateValidity: {
    assumes: "Lepiej pokazać rachunek i zaufać decyzji klientki niż zablokować zakup.",
    loses: "Nie gwarantuje, że wszystkie wizyty zmieszczą się w terminie — ryzyko świadomie przechodzi na klientkę.",
  },
  stateNoTerms: {
    assumes: "Uczciwy brak terminu plus alternatywa budują więcej zaufania niż podsunięcie fałszywej daty.",
    loses: "Rytm zabiegu się rwie — proponowane terminy wypadają poza zalecanym odstępem.",
  },
  stateExit: {
    assumes: "Przerwanie w połowie nie może po cichu gubić wizyt — pakiet jest opłacony, reszta czeka w panelu.",
    loses: "Rezygnacja z domknięcia w jednym podejściu — klientka musi wrócić do panelu później.",
  },
  panelExpiry: {
    assumes: "O wygasającym pakiecie trzeba uprzedzić z wyprzedzeniem i od razu podać akcję.",
    loses: "To jedyny widok, który celowo lekko naciska — traci spokojny ton reszty panelu.",
  },
}

const groups: { label: string; items: { view: View; label: string }[] }[] = [
  {
    label: "Lejek",
    items: [
      { view: "service", label: "1 · Usługa" },
      { view: "termsA", label: "2 · Terminy" },
      { view: "summary", label: "3 · Podsumowanie" },
    ],
  },
  {
    label: "Panel klientki",
    items: [
      { view: "panelFull", label: "Twoje pakiety" },
      { view: "panelEmpty", label: "Stan pusty" },
    ],
  },
  {
    label: "Stany szczególne",
    items: [
      { view: "stateValidity", label: "Ważność" },
      { view: "stateNoTerms", label: "Brak terminów" },
      { view: "stateExit", label: "Wyjście 2 z 4" },
      { view: "panelExpiry", label: "Blisko wygaśnięcia" },
    ],
  },
]

export function PakietyPrototype() {
  const [view, setView] = useState<View>("service")
  const [device, setDevice] = useState<Device>("mobile")
  const [onlyFirst, setOnlyFirst] = useState(false)

  const isTerms = view === "termsA" || view === "termsB"

  function renderScreen() {
    switch (view) {
      case "service":
        return <ScreenService device={device} onNext={() => setView("termsA")} />
      case "termsA":
        return (
          <ScreenTermsA
            device={device}
            onNext={() => {
              setOnlyFirst(false)
              setView("summary")
            }}
            onOnlyFirst={() => {
              setOnlyFirst(true)
              setView("summary")
            }}
          />
        )
      case "termsB":
        return (
          <ScreenTermsB
            device={device}
            onNext={() => {
              setOnlyFirst(false)
              setView("summary")
            }}
            onOnlyFirst={() => {
              setOnlyFirst(true)
              setView("summary")
            }}
          />
        )
      case "summary":
        return <ScreenSummary device={device} onlyFirst={onlyFirst} onConfirm={() => setView("panelFull")} />
      case "panelFull":
        return <PanelFull device={device} />
      case "panelEmpty":
        return <PanelEmpty device={device} onStart={() => setView("service")} />
      case "stateValidity":
        return <StateValidity device={device} onBuyAnyway={() => setView("termsA")} />
      case "stateNoTerms":
        return (
          <StateNoTerms
            device={device}
            onOnlyFirst={() => {
              setOnlyFirst(true)
              setView("summary")
            }}
          />
        )
      case "stateExit":
        return <StateExit device={device} onGoPanel={() => setView("panelFull")} />
      case "panelExpiry":
        return <PanelExpiry device={device} />
    }
  }

  const note = annotations[view]

  return (
    <div className="theme-salon min-h-screen bg-background text-foreground">
      {/* control chrome */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[1100px] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent">
                Makieta klikalna
              </span>
              <h1 className="font-serif text-lg font-medium text-foreground">Pakiety — rezerwacja i panel</h1>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              {(["mobile", "desktop"] as Device[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  className={cn(
                    "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 font-sans text-[0.72rem] transition-colors",
                    device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {d === "mobile" ? <Smartphone className="size-3.5" aria-hidden /> : <Monitor className="size-3.5" aria-hidden />}
                  {d === "mobile" ? "Telefon" : "Desktop"}
                </button>
              ))}
            </div>
          </div>

          {/* view switcher */}
          <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
            {groups.map((g) => (
              <div key={g.label} className="flex flex-col gap-1">
                <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {g.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => {
                    const active = item.view === view || (item.view === "termsA" && isTerms)
                    return (
                      <button
                        key={item.view}
                        type="button"
                        onClick={() => setView(item.view)}
                        className={cn(
                          "min-h-8 rounded-full border px-3 font-sans text-[0.7rem] transition-colors",
                          active
                            ? "border-accent bg-accent/15 text-foreground"
                            : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* variant sub-toggle, only on the terms screen */}
          {isTerms && (
            <div className="mt-3 flex items-center gap-2">
              <span className="font-sans text-[0.62rem] uppercase tracking-wide text-muted-foreground">Wariant</span>
              <div className="flex items-center gap-1 rounded-full border border-border p-1">
                {[
                  { v: "termsA" as View, l: "A · lista" },
                  { v: "termsB" as View, l: "B · kreator" },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setView(o.v)}
                    className={cn(
                      "min-h-8 rounded-full px-3 font-sans text-[0.7rem] transition-colors",
                      view === o.v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* stage */}
      <main className="mx-auto max-w-[1100px] px-5 py-8">
        <DeviceFrame device={device}>{renderScreen()}</DeviceFrame>

        {/* per-screen rationale */}
        <div className="mx-auto mt-6 grid max-w-[640px] gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-border bg-card p-4">
            <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Z jakiego założenia wychodzi
            </span>
            <p className="mt-1.5 font-sans text-[0.78rem] leading-relaxed text-foreground">{note.assumes}</p>
          </div>
          <div className="rounded-[var(--radius)] border border-border bg-card p-4">
            <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Co traci
            </span>
            <p className="mt-1.5 font-sans text-[0.78rem] leading-relaxed text-foreground">{note.loses}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
