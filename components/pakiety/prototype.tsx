"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { DeviceFrame, type Device, type World } from "./ui"
import { Funnel } from "./funnel"
import { PanelEmpty, PanelExpiry, PanelFull } from "./screen-panel"
import { StateExit, StateNoTerms, StateValidity } from "./screen-states"

type View =
  | "funnel"
  | "compareVariant"
  | "compareRemaining"
  | "compareModes"
  | "panelFull"
  | "panelEmpty"
  | "panelExpiry"
  | "stateValidity"
  | "stateNoTerms"
  | "stateExit"

const worldLabel: Record<World, string> = {
  atelier: "Atelier",
  glamour: "Glamour",
  wellness: "Wellness",
}

interface Note {
  assumes: string
  loses: string
}

const notes: Record<View, Note> = {
  funnel: {
    assumes: "Pakiet mieszka w naszym lejku, nie obok niego — ta sama szyna kroków, koszyk, przełącznik języka i jeden przycisk naprzód.",
    loses: "Rezygnujemy z osobnej, głośniejszej ścieżki sprzedaży pakietu — pakiet jest cichą opcją w kroku 2, nie osobnym lejkiem.",
  },
  compareVariant: {
    assumes: "Pakiet to kolejny wariant zakupu tej samej usługi — stoi obok wariantów długości, a pojedyncza wizyta zostaje domyślna.",
    loses: "Dwie sekcje na jednym ekranie są gęstsze niż sam wybór długości; klientka bez zainteresowania pakietem przewija trochę dłużej.",
  },
  compareRemaining: {
    assumes: "Wariant A trzyma wszystko na kroku 4 (szyna 7). Wariant B wstawia krok 4b i rośnie do ośmiu — tylko dla pakietu.",
    loses: "A gęstnieje na wąskim ekranie (cztery edytowalne wiersze). B rwie widok całości — trudniej ocenić odstępy bez cofania.",
  },
  compareModes: {
    assumes: "Klientka pojedynczej wizyty widzi lejek dokładnie taki jak dziś — pakiet zmienia tylko krok 2 i rozrost kroku 4.",
    loses: "Nic nie ujmujemy pojedynczej wizycie; ryzyko jest po stronie pakietu, który dokłada kroki i stany.",
  },
  panelFull: {
    assumes: "Klientka zna stan pakietu sama — zrealizowane, nadchodzące i nieumówione wizyty w jednym miejscu.",
    loses: "To widok obsługowy, nie sprzedażowy — nie promuje kolejnych zakupów.",
  },
  panelEmpty: {
    assumes: "Pusty panel wyjaśnia, czym jest pakiet, i daje jedno spokojne zaproszenie.",
    loses: "Dla klientki bez historii jest z definicji chudy — mało treści.",
  },
  panelExpiry: {
    assumes: "O wygasającym pakiecie uprzedzamy z wyprzedzeniem i od razu dajemy akcję.",
    loses: "Jedyny widok, który celowo lekko naciska — traci spokojny ton reszty panelu.",
  },
  stateValidity: {
    assumes: "Pokazujemy rachunek (140 dni vs 90) i ufamy decyzji klientki, zamiast blokować zakup.",
    loses: "Nie gwarantuje, że wszystkie wizyty zmieszczą się w terminie — ryzyko świadomie po stronie klientki.",
  },
  stateNoTerms: {
    assumes: "Uczciwy brak terminu plus alternatywa poza rytmem budują więcej zaufania niż podsunięcie fałszywej daty.",
    loses: "Rytm zabiegu się rwie — proponowane terminy wypadają poza zalecanym odstępem.",
  },
  stateExit: {
    assumes: "Przerwanie w połowie nie gubi wizyt po cichu — pakiet jest opłacony, reszta czeka w panelu.",
    loses: "Nie domykamy w jednym podejściu — klientka musi wrócić do panelu później.",
  },
}

const groups: { label: string; items: { view: View; label: string }[] }[] = [
  {
    label: "Lejek",
    items: [
      { view: "funnel", label: "Klikalny — od kroku 1" },
      { view: "compareVariant", label: "Krok 2 · trzy światy" },
      { view: "compareRemaining", label: "Pozostałe terminy · trzy światy" },
      { view: "compareModes", label: "Pojedyncza vs pakiet" },
    ],
  },
  {
    label: "Panel klientki",
    items: [
      { view: "panelFull", label: "Twoje pakiety" },
      { view: "panelEmpty", label: "Stan pusty" },
      { view: "panelExpiry", label: "Blisko wygaśnięcia" },
    ],
  },
  {
    label: "Stany szczególne",
    items: [
      { view: "stateValidity", label: "Ważność (rachunek)" },
      { view: "stateNoTerms", label: "Brak terminów" },
      { view: "stateExit", label: "Wyjście 2 z 4" },
    ],
  },
]

export function PakietyPrototype() {
  const [view, setView] = useState<View>("funnel")
  const [device, setDevice] = useState<Device>("mobile")
  const [world, setWorld] = useState<World>("atelier")
  const [terms, setTerms] = useState<"A" | "B">("A")
  const [lang, setLang] = useState<"PL" | "EN">("PL")

  const toggleLang = () => setLang((l) => (l === "PL" ? "EN" : "PL"))
  const showsTermsToggle = view === "funnel" || view === "compareRemaining" || view === "compareModes"

  function singleFrame(w: World) {
    switch (view) {
      case "panelFull":
        return <PanelFull />
      case "panelEmpty":
        return <PanelEmpty onStart={() => setView("funnel")} />
      case "panelExpiry":
        return <PanelExpiry />
      case "stateValidity":
        return <StateValidity onBuyAnyway={() => setView("funnel")} />
      case "stateNoTerms":
        return <StateNoTerms onOnlyFirst={() => setView("funnel")} />
      case "stateExit":
        return <StateExit onGoPanel={() => setView("panelFull")} />
      default:
        return <Funnel world={w} device={device} termsVariant={terms} lang={lang} onLang={toggleLang} />
    }
  }

  const note = notes[view]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── control chrome (the tool, not a world) ── */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[1240px] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Makieta klikalna · bez logiki
              </span>
              <h1 className="text-lg font-medium text-foreground">Pakiety w naszym lejku — trzy światy</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* world switch */}
              <div className="flex items-center gap-1 rounded-full border border-border p-1">
                {(["atelier", "glamour", "wellness"] as World[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWorld(w)}
                    className={cn(
                      "min-h-8 rounded-full px-3 text-[0.72rem] transition-colors",
                      world === w ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {worldLabel[w]}
                  </button>
                ))}
              </div>

              {/* device switch */}
              <div className="flex items-center gap-1 rounded-full border border-border p-1">
                {(["mobile", "desktop"] as Device[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDevice(d)}
                    className={cn(
                      "inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-[0.72rem] transition-colors",
                      device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {d === "mobile" ? <Smartphone className="size-3.5" aria-hidden /> : <Monitor className="size-3.5" aria-hidden />}
                    {d === "mobile" ? "Telefon" : "Desktop"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* view switcher */}
          <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
            {groups.map((g) => (
              <div key={g.label} className="flex flex-col gap-1">
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {g.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => {
                    const active = item.view === view
                    return (
                      <button
                        key={item.view}
                        type="button"
                        onClick={() => setView(item.view)}
                        className={cn(
                          "min-h-8 rounded-full border px-3 text-[0.7rem] transition-colors",
                          active
                            ? "border-foreground bg-secondary text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {showsTermsToggle && (
              <div className="flex flex-col gap-1">
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Pozostałe terminy
                </span>
                <div className="flex items-center gap-1 rounded-full border border-border p-1">
                  {[
                    { v: "A" as const, l: "A · w miejscu" },
                    { v: "B" as const, l: "B · krok 4b" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setTerms(o.v)}
                      className={cn(
                        "min-h-8 rounded-full px-3 text-[0.7rem] transition-colors",
                        terms === o.v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── stage ── */}
      <main className="mx-auto max-w-[1240px] px-5 py-8">
        {view === "compareVariant" && (
          <ThreeWorlds device={device}>
            {(w) => (
              <Funnel world={w} device={device} termsVariant={terms} lang={lang} onLang={toggleLang} initialScreen="variant" initialChoiceId="kobido-60" />
            )}
          </ThreeWorlds>
        )}

        {view === "compareRemaining" && (
          <ThreeWorlds device={device}>
            {(w) =>
              terms === "A" ? (
                <Funnel world={w} device={device} termsVariant="A" lang={lang} onLang={toggleLang} initialScreen="time" initialChoiceId="kobido-4" initialFirstPicked />
              ) : (
                <Funnel world={w} device={device} termsVariant="B" lang={lang} onLang={toggleLang} initialScreen="remainingB" initialChoiceId="kobido-4" initialFirstPicked />
              )
            }
          </ThreeWorlds>
        )}

        {view === "compareModes" && (
          <div className="flex flex-wrap justify-center gap-6">
            <Labeled label={`Pojedyncza wizyta — ${worldLabel[world]} (lejek jak dziś)`}>
              <DeviceFrame world={world} device={device}>
                <Funnel world={world} device={device} termsVariant={terms} lang={lang} onLang={toggleLang} initialScreen="time" initialChoiceId="kobido-60" initialFirstPicked />
              </DeviceFrame>
            </Labeled>
            <Labeled label={`Pakiet 4× — ${worldLabel[world]} (krok 4 rozrasta się)`}>
              <DeviceFrame world={world} device={device}>
                <Funnel world={world} device={device} termsVariant={terms} lang={lang} onLang={toggleLang} initialScreen="time" initialChoiceId="kobido-4" initialFirstPicked />
              </DeviceFrame>
            </Labeled>
          </div>
        )}

        {view !== "compareVariant" && view !== "compareRemaining" && view !== "compareModes" && (
          <DeviceFrame world={world} device={device}>
            {singleFrame(world)}
          </DeviceFrame>
        )}

        {/* per-view rationale */}
        <div className="mx-auto mt-8 grid max-w-[720px] gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-foreground/70">
              Z jakiego założenia wychodzi
            </span>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-foreground">{note.assumes}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Co traci
            </span>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-foreground">{note.loses}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function ThreeWorlds({ device, children }: { device: Device; children: (w: World) => React.ReactNode }) {
  const worlds: World[] = ["atelier", "glamour", "wellness"]
  return (
    <div className="flex gap-6 overflow-x-auto pb-2 lg:justify-center">
      {worlds.map((w) => (
        <Labeled key={w} label={worldLabel[w]}>
          <DeviceFrame world={w} device={device}>
            {children(w)}
          </DeviceFrame>
        </Labeled>
      ))}
    </div>
  )
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
