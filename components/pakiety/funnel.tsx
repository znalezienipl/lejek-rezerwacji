"use client"

import { useState } from "react"
import { Check, Pencil, Clock, TriangleAlert } from "lucide-react"
import {
  services,
  serviceCategories,
  calendarDays,
  daySlots,
  proposedVisits,
} from "@/lib/pakiety-data"
import type { Device, World, CartItem } from "./ui"
import { Btn, Card, FunnelChrome, Note, Pill, ProgressBadge, Radio, tx } from "./ui"

export type Screen = "service" | "variant" | "day" | "time" | "remainingB" | "addAnother" | "second" | "review"

/** One selectable purchase option on step 2 — a length variant OR a package. */
type Choice =
  | { kind: "single"; id: string; label: string; sub: string; price: string }
  | { kind: "package"; id: string; label: string; sub: string; price: string; count: number; save: string; validity: string }

export function Funnel({
  world,
  device,
  termsVariant,
  lang,
  onLang,
  initialScreen = "service",
  initialChoiceId = "kobido-60",
  initialFirstPicked = false,
}: {
  world: World
  device: Device
  termsVariant: "A" | "B"
  lang: "PL" | "EN"
  onLang: () => void
  initialScreen?: Screen
  initialChoiceId?: string
  initialFirstPicked?: boolean
}) {
  void world
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [serviceId, setServiceId] = useState("kobido")
  const [choiceId, setChoiceId] = useState<string>(initialChoiceId)
  const [firstPicked, setFirstPicked] = useState(initialFirstPicked)
  const [slotId, setSlotId] = useState("s3")
  const [dayChosen, setDayChosen] = useState(15)
  const [editing, setEditing] = useState<number | null>(null)
  const [addedAnother, setAddedAnother] = useState(false)
  const [onlyFirst, setOnlyFirst] = useState(false)
  const [warnOpen, setWarnOpen] = useState(false)
  const [pendingDay, setPendingDay] = useState<number | null>(null)

  const service = services.find((s) => s.id === serviceId)!

  // Build the step-2 choice list: length variants first (single default), then packages.
  const choices: Choice[] = [
    ...service.variants.map((v) => ({
      kind: "single" as const,
      id: v.id,
      label: v.label,
      sub: `${v.duration} · pojedyncza wizyta`,
      price: v.price,
    })),
    ...service.packages.map((p) => ({
      kind: "package" as const,
      id: p.id,
      label: `Pakiet ${p.count} wizyt`,
      sub: `${p.perTreatment} za zabieg · ważność ${p.validity}`,
      price: p.total,
      count: p.count,
      save: p.save,
      validity: p.validity,
    })),
  ]
  const choice = choices.find((c) => c.id === choiceId) ?? choices[0]
  const isPackage = choice.kind === "package"
  const pkgCount = isPackage ? (choice as Extract<Choice, { kind: "package" }>).count : 1

  // Cart: a package is ONE line item ("4 × Kobido, 660 zł"), never N lines.
  const cart: CartItem[] = isPackage
    ? [{ label: `${pkgCount} × ${service.name}`, amount: choice.price }]
    : [{ label: `${service.name} · ${(choice as Extract<Choice, { kind: "single" }>).sub.split(" · ")[0]}`, amount: choice.price }]
  const cartAmount = choice.price

  // Rail labels — single = 7, package A = 7, package B = 8.
  const railSingle = ["Zabieg", "Wariant", "Dzień", "Godzina", "Kolejny", "Układ", "Sprawdź"]
  const railPkgA = ["Zabieg", "Wariant", "Dzień", "Terminy", "Kolejny", "Układ", "Sprawdź"]
  const railPkgB = ["Zabieg", "Wariant", "Dzień", "Godzina", "Pozostałe", "Kolejny", "Układ", "Sprawdź"]
  const rail = !isPackage ? railSingle : termsVariant === "A" ? railPkgA : railPkgB
  const totalSteps = rail.length

  // Map screen → 1-based rail position.
  const stepOf: Record<Screen, number> = {
    service: 1,
    variant: 2,
    day: 3,
    time: 4,
    remainingB: 5,
    addAnother: isPackage ? (termsVariant === "B" ? 6 : 5) : 5,
    second: isPackage ? (termsVariant === "B" ? 7 : 6) : 6,
    review: totalSteps,
  }

  /* ---------- navigation ---------- */
  function fromService() {
    setScreen("variant")
  }
  function fromVariant() {
    setScreen("day")
  }
  function fromDay() {
    setFirstPicked(false)
    setScreen("time")
  }
  function fromTime() {
    if (!isPackage) {
      setScreen("addAnother")
      return
    }
    // package: variant A keeps everything on step 4 (already expanded); B goes to 4b
    setScreen(termsVariant === "B" ? "remainingB" : "addAnother")
  }
  function afterRemaining() {
    // full path — every visit is scheduled now, so clear any "only first" flag
    setOnlyFirst(false)
    // package skips "add another" (step 5) and "layout" (step 6) → straight to review
    setScreen("review")
  }

  function requestDayChange(day: number) {
    if (firstPicked && day !== dayChosen) {
      // our funnel zeroes the slot and the whole set sequence — warn first
      setPendingDay(day)
      setWarnOpen(true)
      return
    }
    setDayChosen(day)
  }
  function confirmDayChange() {
    if (pendingDay != null) setDayChosen(pendingDay)
    setFirstPicked(false)
    setSlotId("")
    setEditing(null)
    setWarnOpen(false)
    setPendingDay(null)
  }

  /* ---------- per-screen chrome config ---------- */
  const chrome = (() => {
    switch (screen) {
      case "service":
        return { heading: "Wybierz zabieg", price: undefined, action: "Dalej", onAction: fromService, onBack: undefined as (() => void) | undefined }
      case "variant":
        // step 2 header shows the treatment NAME + selected price, never "Krok 2"
        return { heading: service.name, price: choice.price, action: "Wybierz datę", onAction: fromVariant, onBack: () => setScreen("service") }
      case "day":
        return { heading: "Wybierz dzień", price: undefined, action: firstPicked || dayChosen ? "Dalej — godzina" : "Dalej", onAction: fromDay, onBack: () => setScreen("variant") }
      case "time":
        return {
          heading: isPackage && termsVariant === "A" ? "Godzina, osoba i pozostałe terminy" : "Godzina i osoba",
          price: undefined,
          action: isPackage ? (termsVariant === "B" ? "Dalej — pozostałe wizyty" : "Dalej — sprawdź rezerwację") : "Dalej",
          onAction: fromTime,
          onBack: () => setScreen("day"),
        }
      case "remainingB":
        return { heading: "Pozostałe wizyty", price: undefined, action: "Dalej — sprawdź rezerwację", onAction: afterRemaining, onBack: () => setScreen("time") }
      case "addAnother":
        return {
          heading: "Dodaj kolejny zabieg",
          price: undefined,
          action: addedAnother ? "Dalej — układ wizyty" : "Dalej — sprawdź rezerwację",
          onAction: () => setScreen(addedAnother ? "second" : "review"),
          onBack: () => setScreen(isPackage && termsVariant === "B" ? "remainingB" : "time"),
        }
      case "second":
        return { heading: "Kiedy ma się odbyć?", price: undefined, action: "Dalej — sprawdź rezerwację", onAction: () => setScreen("review"), onBack: () => setScreen("addAnother") }
      case "review":
        return {
          heading: "Sprawdź rezerwację",
          price: undefined,
          action: "Potwierdź rezerwację",
          onAction: () => setScreen("service"),
          onBack: () => setScreen(isPackage ? (termsVariant === "B" ? "remainingB" : "time") : addedAnother ? "second" : "addAnother"),
        }
    }
  })()

  const secondary =
    isPackage && (screen === "time" || screen === "remainingB")
      ? {
          label: "Umów tylko pierwszą wizytę, resztę wybiorę później",
          onClick: () => {
            setOnlyFirst(true)
            setScreen("review")
          },
        }
      : undefined

  return (
    <FunnelChrome
      device={device}
      step={stepOf[screen]}
      totalSteps={totalSteps}
      stepLabels={rail}
      heading={chrome.heading}
      price={chrome.price}
      cart={cart}
      cartAmount={cartAmount}
      lang={lang}
      onLang={onLang}
      onBack={chrome.onBack}
      actionLabel={chrome.action}
      onAction={chrome.onAction}
      secondary={secondary}
    >
      {screen === "service" && <StepService serviceId={serviceId} onPick={(id) => { setServiceId(id); setChoiceId(services.find((s) => s.id === id)!.variants[0].id) }} />}
      {screen === "variant" && <StepVariant choices={choices} choiceId={choice.id} onPick={setChoiceId} interval={service.interval} />}
      {screen === "day" && (
        <StepDay
          chosen={dayChosen}
          onPick={requestDayChange}
          warnOpen={warnOpen}
          onCancelWarn={() => { setWarnOpen(false); setPendingDay(null) }}
          onConfirmWarn={confirmDayChange}
          pendingDay={pendingDay}
          isPackage={isPackage}
        />
      )}
      {screen === "time" && (
        <StepTime
          slotId={slotId}
          onPickSlot={(id) => { setSlotId(id); setFirstPicked(true) }}
          firstPicked={firstPicked}
          isPackageA={isPackage && termsVariant === "A"}
          pkgCount={pkgCount}
          editing={editing}
          setEditing={setEditing}
        />
      )}
      {screen === "remainingB" && <StepRemainingB pkgCount={pkgCount} editing={editing} setEditing={setEditing} />}
      {screen === "addAnother" && (
        <StepAddAnother isPackage={isPackage} added={addedAnother} onToggle={setAddedAnother} serviceName={service.name} />
      )}
      {screen === "second" && <StepSecond />}
      {screen === "review" && <StepReview isPackage={isPackage} pkgCount={pkgCount} serviceName={service.name} total={choice.price} onlyFirst={onlyFirst} />}
    </FunnelChrome>
  )
}

/* ============================ STEP 1 ============================ */
function StepService({ serviceId, onPick }: { serviceId: string; onPick: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Wybierz zabieg z listy. Wariant długości i pakiet wybierzesz na następnym ekranie.
      </p>
      {serviceCategories.map((cat) => (
        <div key={cat.label} className="flex flex-col gap-2">
          <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
            {cat.label}
          </span>
          {cat.serviceIds.map((id) => {
            const s = services.find((x) => x.id === id)!
            const active = s.id === serviceId
            return (
              <Card key={id} as="button" selected={active} onClick={() => onPick(id)} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <Radio checked={active} />
                  <span className="flex flex-col">
                    <span className="font-sans font-medium text-foreground" style={tx(7)}>{s.name}</span>
                    <span className="font-sans text-muted-foreground" style={tx(3)}>od {s.price} · {s.duration}</span>
                  </span>
                </span>
              </Card>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ============================ STEP 2 ============================ */
function StepVariant({ choices, choiceId, onPick, interval }: { choices: Choice[]; choiceId: string; onPick: (id: string) => void; interval: string }) {
  const singles = choices.filter((c) => c.kind === "single")
  const packages = choices.filter((c) => c.kind === "package")
  return (
    <div className="flex flex-col gap-5">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Ten sam zabieg w kilku postaciach. Pojedyncza wizyta jest zaznaczona domyślnie — pakiet to opcja obok, nie zamiast.
      </p>

      {/* length variants — the plain single visit, default */}
      <div className="flex flex-col gap-2">
        <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
          Pojedyncza wizyta
        </span>
        {singles.map((c) => (
          <Card key={c.id} as="button" selected={choiceId === c.id} onClick={() => onPick(c.id)} className="flex items-start gap-3">
            <Radio checked={choiceId === c.id} />
            <span className="flex flex-1 items-baseline justify-between gap-2">
              <span className="flex flex-col">
                <span className="font-sans font-medium text-foreground" style={tx(6)}>{c.label}</span>
                <span className="font-sans text-muted-foreground" style={tx(3)}>{c.sub}</span>
              </span>
              <span className="font-serif text-foreground" style={{ fontSize: "var(--lejek-kwota)" }}>{c.price}</span>
            </span>
          </Card>
        ))}
      </div>

      {/* packages — same treatment, bought as a series */}
      <div className="flex flex-col gap-2">
        <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
          Pakiet — {interval}
        </span>
        {packages.map((c) => {
          const p = c as Extract<Choice, { kind: "package" }>
          return (
            <Card key={c.id} as="button" selected={choiceId === c.id} onClick={() => onPick(c.id)} className="flex items-start gap-3">
              <Radio checked={choiceId === c.id} />
              <span className="flex flex-1 flex-col gap-2">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-sans font-medium text-foreground" style={tx(6)}>{c.label}</span>
                  <Pill tone="accent">−{p.save}</Pill>
                </span>
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-sans text-muted-foreground" style={tx(3)}>{c.sub}</span>
                  <span className="font-serif text-foreground" style={{ fontSize: "var(--lejek-kwota)" }}>{c.price}</span>
                </span>
                <span className="font-sans text-muted-foreground" style={tx(2)}>terminy umawiasz od razu · płatność w salonie</span>
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* ============================ STEP 3 ============================ */
function StepDay({
  chosen,
  onPick,
  warnOpen,
  onCancelWarn,
  onConfirmWarn,
  pendingDay,
  isPackage,
}: {
  chosen: number
  onPick: (d: number) => void
  warnOpen: boolean
  onCancelWarn: () => void
  onConfirmWarn: () => void
  pendingDay: number | null
  isPackage: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Wybierasz dzień pierwszej wizyty. Październik 2025.
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {["P", "W", "Ś", "C", "P", "S", "N"].map((d, i) => (
          <span key={i} className="text-center font-sans text-muted-foreground" style={tx(1)}>{d}</span>
        ))}
        {/* lead offset so the 13th lands on a Monday-ish column */}
        {Array.from({ length: 1 }).map((_, i) => <span key={`pad-${i}`} />)}
        {calendarDays.map((d) => {
          const active = d.day === chosen
          return (
            <button
              key={d.day}
              type="button"
              disabled={!d.free}
              onClick={() => onPick(d.day)}
              className={`flex aspect-square items-center justify-center rounded-[var(--radius)] border font-sans transition-colors ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : d.free
                    ? "border-[color:var(--border)] text-foreground hover:border-accent"
                    : "border-transparent text-muted-foreground/40"
              }`}
              style={tx(4)}
            >
              {d.day}
            </button>
          )
        })}
      </div>
      {isPackage && (
        <Note tone="info" icon={<Clock className="size-4" aria-hidden />}>
          To dzień pierwszej z wizyt. Kolejne trzy zaproponujemy w rytmie co 4 tygodnie na następnym ekranie.
        </Note>
      )}

      {warnOpen && (
        <div className="rounded-[var(--radius)] border border-accent/50 bg-accent/10 p-4">
          <div className="flex items-start gap-2.5">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <div>
              <p className="font-sans font-medium text-foreground" style={tx(5)}>Zmiana dnia wyzeruje ustawioną sekwencję</p>
              <p className="mt-1 font-sans leading-relaxed text-muted-foreground" style={tx(3)}>
                Masz już wybraną godzinę{isPackage ? " i trzy kolejne terminy w rytmie" : ""}. Zmiana na {pendingDay} października skasuje ten wybór i zaczniemy dobór terminów od nowa.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn variant="outline" onClick={onCancelWarn}>Zostaw jak było</Btn>
                <Btn onClick={onConfirmWarn}>Zmień dzień i zacznij od nowa</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================ STEP 4 ============================ */
function StepTime({
  slotId,
  onPickSlot,
  firstPicked,
  isPackageA,
  pkgCount,
  editing,
  setEditing,
}: {
  slotId: string
  onPickSlot: (id: string) => void
  firstPicked: boolean
  isPackageA: boolean
  pkgCount: number
  editing: number | null
  setEditing: (n: number | null) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        {isPackageA ? "Wybierz godzinę pierwszej wizyty — pozostałe pojawią się poniżej, w rytmie zabiegu." : "Wolne godziny na wybrany dzień, każda z osobą, która ją poprowadzi."}
      </p>

      {/* first-visit slots */}
      <div className="flex flex-col gap-2">
        {daySlots.map((s) => {
          const active = s.id === slotId
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPickSlot(s.id)}
              className={`flex min-h-12 items-center justify-between gap-2 rounded-[var(--radius)] border px-3.5 text-left transition-colors ${
                active ? "border-accent bg-accent/10" : "border-[color:var(--border)] hover:border-accent/60"
              }`}
              style={{ borderWidth: "var(--lejek-ramka)" }}
            >
              <span className="font-sans font-medium text-foreground" style={tx(6)}>{s.time}</span>
              <span className="flex items-center gap-2 font-sans text-muted-foreground" style={tx(3)}>
                {s.staff}
                {active && <Check className="size-4 text-accent" aria-hidden />}
              </span>
            </button>
          )
        })}
      </div>

      {/* variant A — remaining three visits expand in place after the first pick */}
      {isPackageA && firstPicked && (
        <div className="flex flex-col gap-3 border-t border-[color:var(--border)] pt-4">
          <ProgressBadge chosen={pkgCount} total={pkgCount} validity="8 stycznia 2026" />
          <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
            Pozostałe wizyty w rytmie co 4 tygodnie
          </span>
          <RemainingList editing={editing} setEditing={setEditing} />
        </div>
      )}
    </div>
  )
}

/* ============================ STEP 4b ============================ */
function StepRemainingB({ pkgCount, editing, setEditing }: { pkgCount: number; editing: number | null; setEditing: (n: number | null) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Pierwszą wizytę masz już wybraną. Zaproponowaliśmy trzy kolejne w rytmie co 4 tygodnie — każdą możesz zmienić albo pominąć.
      </p>
      <ProgressBadge chosen={pkgCount} total={pkgCount} validity="8 stycznia 2026" />
      <RemainingList editing={editing} setEditing={setEditing} />
    </div>
  )
}

/** Shared editable list of the three remaining proposed visits. */
function RemainingList({ editing, setEditing }: { editing: number | null; setEditing: (n: number | null) => void }) {
  const remaining = proposedVisits.slice(1) // visits 2..4
  const [chosen, setChosen] = useState(remaining.map((v) => ({ date: v.date, time: v.time, staff: v.staff })))
  return (
    <div className="flex flex-col gap-3">
      {remaining.map((visit, i) => {
        const sel = chosen[i]
        const isEditing = editing === visit.index
        return (
          <div key={visit.index} className="rounded-[calc(var(--radius)+2px)] border border-[color:var(--border)] bg-card p-4" style={{ borderWidth: "var(--lejek-ramka)" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-sans font-semibold text-primary-foreground" style={tx(2)}>
                  {visit.index}
                </span>
                <div>
                  <div className="font-sans font-medium text-foreground" style={tx(5)}>{sel.date} · {sel.time}</div>
                  <div className="font-sans text-muted-foreground" style={tx(2)}>{sel.staff}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditing(isEditing ? null : visit.index)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[color:var(--border)] px-3 font-sans text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                style={tx(2)}
              >
                <Pencil className="size-3" aria-hidden />
                {isEditing ? "Zamknij" : "Zmień"}
              </button>
            </div>
            {isEditing && (
              <div className="mt-3 flex flex-col gap-2 border-t border-[color:var(--border)] pt-3">
                {visit.alternatives.map((alt) => {
                  const active = sel.date === alt.date && sel.time === alt.time
                  return (
                    <button
                      key={alt.id}
                      type="button"
                      onClick={() => { setChosen((prev) => prev.map((c, idx) => (idx === i ? { date: alt.date, time: alt.time, staff: alt.staff } : c))); setEditing(null) }}
                      className={`flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius)] border px-3 text-left transition-colors ${active ? "border-accent bg-accent/10" : "border-[color:var(--border)] hover:border-accent/50"}`}
                      style={{ borderWidth: "var(--lejek-ramka)" }}
                    >
                      <span className="font-sans text-foreground" style={tx(4)}>{alt.date} · {alt.time}</span>
                      <span className="flex items-center gap-2 font-sans text-muted-foreground" style={tx(2)}>{alt.staff}{active && <Check className="size-3.5 text-accent" aria-hidden />}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ============================ STEP 5 ============================ */
function StepAddAnother({ isPackage, added, onToggle, serviceName }: { isPackage: boolean; added: boolean; onToggle: (b: boolean) => void; serviceName: string }) {
  if (isPackage) {
    // for a package this step hides its usual content — the decision is made visible
    return (
      <div className="flex flex-col gap-4">
        <Note tone="info" icon={<Check className="size-4" aria-hidden />}>
          Kupujesz serię tego samego zabiegu ({serviceName}). Innego zabiegu nie dodajemy do pakietu — zrobisz to przy zwykłej rezerwacji, jeśli zechcesz. Ten krok pomijamy.
        </Note>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Chcesz połączyć wizytę z drugim zabiegiem tego samego dnia?
      </p>
      <Card as="button" selected={!added} onClick={() => onToggle(false)} className="flex items-center gap-3">
        <Radio checked={!added} />
        <span className="font-sans font-medium text-foreground" style={tx(6)}>Nie, to wszystko</span>
      </Card>
      <Card as="button" selected={added} onClick={() => onToggle(true)} className="flex items-center gap-3">
        <Radio checked={added} />
        <span className="flex flex-col">
          <span className="font-sans font-medium text-foreground" style={tx(6)}>Tak, dodaj drugi zabieg</span>
          <span className="font-sans text-muted-foreground" style={tx(3)}>ustawimy jego układ na następnym kroku</span>
        </span>
      </Card>
    </div>
  )
}

/* ============================ STEP 6 ============================ */
function StepSecond() {
  const [layout, setLayout] = useState<"same" | "after">("same")
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans leading-relaxed text-muted-foreground" style={tx(4)}>
        Jak ma wyglądać drugi zabieg względem pierwszego?
      </p>
      <Card as="button" selected={layout === "same"} onClick={() => setLayout("same")} className="flex items-start gap-3">
        <Radio checked={layout === "same"} />
        <span className="flex flex-col">
          <span className="font-sans font-medium text-foreground" style={tx(6)}>U tej samej osoby, w jednej wizycie</span>
          <span className="font-sans text-muted-foreground" style={tx(3)}>jeden dłuższy blok, bez przerwy</span>
        </span>
      </Card>
      <Card as="button" selected={layout === "after"} onClick={() => setLayout("after")} className="flex items-start gap-3">
        <Radio checked={layout === "after"} />
        <span className="flex flex-col">
          <span className="font-sans font-medium text-foreground" style={tx(6)}>Zaraz po pierwszym</span>
          <span className="font-sans text-muted-foreground" style={tx(3)}>druga osoba może przejąć zaraz po</span>
        </span>
      </Card>
    </div>
  )
}

/* ============================ STEP 7 ============================ */
function StepReview({ isPackage, pkgCount, serviceName, total, onlyFirst }: { isPackage: boolean; pkgCount: number; serviceName: string; total: string; onlyFirst: boolean }) {
  const visits = isPackage ? proposedVisits.slice(0, pkgCount) : proposedVisits.slice(0, 1)
  const shown = onlyFirst ? visits.slice(0, 1) : visits
  return (
    <div className="flex flex-col gap-5">
      {/* what's booked */}
      <div className="flex flex-col gap-2">
        <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>
          {isPackage ? `Pakiet ${pkgCount} × ${serviceName}` : serviceName}
        </span>
        {shown.map((v) => (
          <div key={v.index} className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-card px-3.5 py-2.5" style={{ borderWidth: "var(--lejek-ramka)" }}>
            <span className="font-sans text-foreground" style={tx(4)}>{v.date} · {v.time}</span>
            <span className="font-sans text-muted-foreground" style={tx(3)}>{v.staff}</span>
          </div>
        ))}
        {isPackage && onlyFirst && (
          <Note tone="info">
            Umawiasz teraz tylko pierwszą wizytę. Pozostałe {pkgCount - 1} zarezerwujesz później w panelu — pakiet jest opłacony i na Ciebie czeka.
          </Note>
        )}
      </div>

      {/* details + consents (static) */}
      <div className="flex flex-col gap-2">
        <span className="font-sans font-semibold uppercase text-muted-foreground" style={{ fontSize: "var(--lejek-tekst-1)", letterSpacing: "var(--lejek-nadtytul-odstep)" }}>Twoje dane</span>
        <div className="rounded-[var(--radius)] border border-[color:var(--border)] bg-card p-3.5" style={{ borderWidth: "var(--lejek-ramka)" }}>
          <p className="font-sans text-foreground" style={tx(5)}>Anna Kowalska</p>
          <p className="font-sans text-muted-foreground" style={tx(3)}>anna@example.com · 600 100 200</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] bg-secondary/60 px-4 py-3">
        <span className="font-sans text-foreground" style={tx(5)}>Razem — płatność w salonie</span>
        <span className="font-serif text-foreground" style={{ fontSize: "var(--lejek-kwota-duza)" }}>{onlyFirst ? total + " (cały pakiet)" : total}</span>
      </div>
    </div>
  )
}
