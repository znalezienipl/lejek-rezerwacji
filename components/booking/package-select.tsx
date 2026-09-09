import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import { specialistsByTheme } from "@/lib/booking-data"
import { Avatar, Btn, Label, Money, Surface, Tag, TimeRange, type VariantDef } from "./shared"
import { Shell } from "./variant-split"

/**
 * Step 2 of the booking funnel AND its package tail: the client picked the
 * treatment, chose HOW to buy it (single vs package), then scheduled the FIRST
 * visit in steps 3–4. What follows here is the rest of the package — never
 * "pick five more times", but "here are the remaining visits in the treatment's
 * rhythm; fix any that don't fit; one button accepts them all."
 *
 * Everything is a static mock. Dates are hardcoded, states are switched by
 * hand. Every visual reads the world's shadcn tokens through the shared
 * primitives, so all screens theme across atelier / glamour / wellness with no
 * per-world code.
 */

const treatmentName = "Masaż twarzy Kobido"
const packageInterval = "zalecany odstęp 4 tygodnie"
const performer = "Bogdana"
const performerIndex = 1 // avatar face pulled from each world's own team

/* ---------------------------------- step 2 ---------------------------------- */

const singleVariants = [
  { id: "kobido-60", label: "Wersja klasyczna", sub: "60 minut", price: "180 zł" },
  { id: "kobido-90", label: "Wersja rozszerzona", sub: "90 minut", price: "250 zł" },
]

const packageOptions = [
  { id: "kobido-4", label: "Pakiet 4 wizyt", per: "165 zł za zabieg", total: "660 zł", save: "60 zł", validity: "ważny 90 dni" },
  { id: "kobido-6", label: "Pakiet 6 wizyt", per: "150 zł za zabieg", total: "900 zł", save: "180 zł", validity: "ważny 90 dni" },
]

/* ------------------------------ remaining terms ------------------------------ */

type Visit = {
  n: number
  weekday: string
  date: string
  from: string
  to: string
  chosen?: boolean // the first visit, picked by her in steps 3–4
  over?: boolean // falls after the package's validity window
}

/** 4-visit package fits inside 90 days (15 Jan → 9 Apr ≈ 84 days). Happy path. */
const pkg4: Visit[] = [
  { n: 1, weekday: "czw", date: "15 stycznia", from: "12:30", to: "13:30", chosen: true },
  { n: 2, weekday: "czw", date: "12 lutego", from: "12:30", to: "13:30" },
  { n: 3, weekday: "czw", date: "12 marca", from: "12:30", to: "13:30" },
  { n: 4, weekday: "czw", date: "9 kwietnia", from: "12:30", to: "13:30" },
]

/** 6-visit package spans 140 days — used only for the overflow + density states. */
const pkg6: Visit[] = [
  { n: 1, weekday: "czw", date: "15 stycznia", from: "12:30", to: "13:30", chosen: true },
  { n: 2, weekday: "czw", date: "12 lutego", from: "12:30", to: "13:30" },
  { n: 3, weekday: "czw", date: "12 marca", from: "12:30", to: "13:30" },
  { n: 4, weekday: "czw", date: "9 kwietnia", from: "12:30", to: "13:30" },
  { n: 5, weekday: "czw", date: "7 maja", from: "12:30", to: "13:30", over: true },
  { n: 6, weekday: "czw", date: "4 czerwca", from: "12:30", to: "13:30", over: true },
]

/** Slots offered when a single visit is changed in place — mirrors the panel reschedule. */
const changeSlots = [
  { from: "11:00", to: "12:00", note: "najbliższy wolny", active: true },
  { from: "14:00", to: "15:00", note: "" },
  { from: "17:30", to: "18:30", note: "" },
]

function SelectDot({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
        selected ? "border-transparent bg-accent text-accent-foreground" : "border-border text-transparent",
      )}
    >
      <Check className="size-3" />
    </span>
  )
}

/** Small circular radio used inside the in-place slot picker. */
function Radio({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border",
        on ? "border-accent" : "border-border",
      )}
    >
      {on && <span className="size-2 rounded-full bg-accent" />}
    </span>
  )
}

function PackageScreen({ theme, selected }: { theme: ThemeId; selected: string }) {
  return (
    <Shell
      theme={theme}
      step={2}
      title={treatmentName}
      action={
        <Btn>
          Wybierz termin <ArrowRight className="size-3.5" aria-hidden />
        </Btn>
      }
    >
      <div className="flex flex-col gap-6">
        <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
          Ten sam zabieg w kilku postaciach. Pojedyncza wizyta jest zaznaczona domyślnie — pakiet to opcja obok, nie
          zamiast.
        </p>

        <div>
          <Label theme={theme}>Pojedyncza wizyta</Label>
          <div className="mt-2.5 flex flex-col gap-2">
            {singleVariants.map((v) => {
              const on = v.id === selected
              return (
                <div
                  key={v.id}
                  className={cn(
                    "flex items-center gap-3 rounded-[var(--radius)] border px-3.5 py-3 transition-colors",
                    on ? "border-accent bg-secondary/40" : "border-border",
                  )}
                >
                  <SelectDot selected={on} />
                  <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <span className="block font-sans text-[0.8rem] font-medium text-foreground">{v.label}</span>
                      <span className="font-sans text-[0.68rem] text-muted-foreground">{v.sub}</span>
                    </div>
                    <Money className="shrink-0 text-[0.85rem]">{v.price}</Money>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <Label theme={theme}>Pakiet</Label>
            <span className="font-sans text-[0.65rem] text-muted-foreground">{packageInterval}</span>
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            {packageOptions.map((p) => {
              const on = p.id === selected
              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex items-start gap-3 rounded-[var(--radius)] border px-3.5 py-3 transition-colors",
                    on ? "border-accent bg-secondary/40" : "border-border",
                  )}
                >
                  <SelectDot selected={on} />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-[0.8rem] font-medium text-foreground">{p.label}</span>
                      <Tag>−{p.save}</Tag>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-sans text-[0.68rem] text-muted-foreground">{p.per}</span>
                      <Money className="text-[0.85rem]">{p.total}</Money>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-2 font-sans text-[0.65rem] text-muted-foreground">
                      <span>{p.validity}</span>
                      <span aria-hidden>·</span>
                      <span className="text-foreground">terminy umawiasz od razu</span>
                      <span aria-hidden>·</span>
                      <span>płatność w salonie</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ------------------------------- proposal row ------------------------------- */

function ProposalRow({
  theme,
  visit,
  total,
  right,
  note,
  changed,
  dim,
}: {
  theme: ThemeId
  visit: Visit
  total: number
  right?: React.ReactNode
  note?: React.ReactNode
  changed?: boolean
  dim?: boolean
}) {
  const people = specialistsByTheme[theme]
  return (
    <Surface active={visit.chosen} muted={dim} className="px-3.5 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Label theme={theme}>
              Wizyta {visit.n} z {total}
            </Label>
            {visit.chosen && <Tag>Twój wybór</Tag>}
            {changed && <Tag>zmienione</Tag>}
          </div>
          <span
            className={cn(
              "mt-1 block font-sans text-[0.82rem] font-medium",
              visit.over ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {visit.weekday}, {visit.date}
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <TimeRange from={visit.from} to={visit.to} className="text-[0.72rem]" />
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Avatar src={people[performerIndex].image} alt={performer} size={18} />
              <span className="font-sans text-[0.68rem] text-muted-foreground">{performer}</span>
            </span>
          </div>
          {note}
        </div>
        {right !== undefined ? (
          right
        ) : visit.chosen ? null : (
          <span className="shrink-0 font-sans text-[0.64rem] uppercase tracking-[0.12em] text-accent">Zmień</span>
        )}
      </div>
    </Surface>
  )
}

/** Running counter line — "n z n zaproponowanych · ważny do …". */
function CounterLine({ theme, done, total, validTo }: { theme: ThemeId; done: number; total: number; validTo: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-3">
      <span className="font-sans text-[0.72rem] text-foreground">
        {done} z {total} terminów zaproponowanych
      </span>
      <span className="font-sans text-[0.66rem] text-muted-foreground">ważny do {validTo}</span>
    </div>
  )
}

const acceptAll = (
  <Btn>
    Przyjmij wszystkie terminy <ArrowRight className="size-3.5" aria-hidden />
  </Btn>
)

/* State 1 — all proposals ready, plus the "book later" third rung. */
function ProposalsScreen({ theme }: { theme: ThemeId }) {
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={acceptAll}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
            Pierwszy termin wybrałaś sama. Pozostałe proponujemy co cztery tygodnie — ta sama godzina, ta sama osoba.
            Popraw każdy, który nie pasuje; nie musisz wybierać ich po kolei.
          </p>
        </div>
        <CounterLine theme={theme} done={4} total={4} validTo="15 kwietnia" />
        <div className="flex flex-col gap-2">
          {pkg4.map((v) => (
            <ProposalRow key={v.n} theme={theme} visit={v} total={4} />
          ))}
        </div>
        <div className="border-t border-border pt-3">
          <span className="block font-sans text-[0.72rem] text-foreground">Nie chcesz teraz układać wszystkiego?</span>
          <span className="mt-1 inline-flex items-center gap-1.5 font-sans text-[0.7rem] text-accent">
            Umów tylko pierwszą wizytę, resztę wybierzesz później
            <ArrowRight className="size-3" aria-hidden />
          </span>
        </div>
      </div>
    </Shell>
  )
}

/* State 2 (open) — one visit being changed IN PLACE, like the panel reschedule. */
function ChangeOpenScreen({ theme }: { theme: ThemeId }) {
  const people = specialistsByTheme[theme]
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={<Btn>Zapisz nowy termin</Btn>}
    >
      <div className="flex flex-col gap-2">
        <ProposalRow theme={theme} visit={pkg4[0]} total={4} />
        <ProposalRow theme={theme} visit={pkg4[1]} total={4} />

        {/* the expanded row — opens right here, no navigation away */}
        <Surface active className="px-3.5 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <Label theme={theme}>Zmieniasz wizytę 3 z 4</Label>
            <span className="font-sans text-[0.64rem] uppercase tracking-[0.12em] text-muted-foreground">Zamknij</span>
          </div>
          <span className="mt-1.5 block font-sans text-[0.72rem] text-muted-foreground">
            Inne godziny 12 marca u: {performer}
          </span>
          <div className="mt-2.5 flex flex-col gap-2">
            {changeSlots.map((s) => (
              <div
                key={s.from}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius)] border px-3 py-2.5",
                  s.active ? "border-accent bg-secondary/40" : "border-border",
                )}
              >
                <Radio on={!!s.active} />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <TimeRange from={s.from} to={s.to} className="text-[0.74rem]" />
                  {s.note && <span className="font-sans text-[0.64rem] text-muted-foreground">{s.note}</span>}
                </div>
                <Avatar src={people[performerIndex].image} alt={performer} size={20} />
              </div>
            ))}
          </div>
          <span className="mt-3 inline-block font-sans text-[0.66rem] uppercase tracking-[0.12em] text-accent">
            Inny dzień
          </span>
        </Surface>

        <ProposalRow theme={theme} visit={pkg4[3]} total={4} />
      </div>
    </Shell>
  )
}

/* State 2 (after) — the changed visit now shows its new time. */
function ChangeDoneScreen({ theme }: { theme: ThemeId }) {
  const changedVisit: Visit = { ...pkg4[2], from: "14:00", to: "15:00" }
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={acceptAll}
    >
      <div className="flex flex-col gap-4">
        <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
          Wizyta 3 przeniesiona na 14:00. Pozostałe zostają bez zmian.
        </p>
        <div className="flex flex-col gap-2">
          <ProposalRow theme={theme} visit={pkg4[0]} total={4} />
          <ProposalRow theme={theme} visit={pkg4[1]} total={4} />
          <ProposalRow theme={theme} visit={changedVisit} total={4} changed />
          <ProposalRow theme={theme} visit={pkg4[3]} total={4} />
        </div>
      </div>
    </Shell>
  )
}

/* State 3 — the change breaks the rhythm. This is a decision, offered explicitly. */
function RhythmScreen({ theme }: { theme: ThemeId }) {
  const moved: Visit = { ...pkg4[2], date: "26 marca" }
  const options = [
    {
      title: "Zostaw pozostałe bez zmian",
      meta: "wizyta 4 dalej 9 kwietnia",
      body: "Zmieniasz tylko tę jedną wizytę. Kolejne zostają tam, gdzie już je zaplanowałaś.",
      recommended: true,
    },
    {
      title: "Przesuń też kolejne o dwa tygodnie",
      meta: "wizyta 4 → 23 kwietnia",
      body: "Odtwarzamy rytm co cztery tygodnie od nowej daty. Dalsze wizyty przesuną się razem.",
      recommended: false,
    },
  ]
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={<Btn>Zapisz wybór</Btn>}
    >
      <div className="flex flex-col gap-4">
        <ProposalRow theme={theme} visit={moved} total={4} changed />
        <div className="rounded-[var(--radius)] border border-accent/40 bg-accent/5 px-3.5 py-3">
          <span className="block font-sans text-[0.78rem] font-medium text-foreground">
            Przesunęłaś wizytę 3 o dwa tygodnie — rytm co cztery tygodnie już się nie zgadza.
          </span>
          <span className="mt-1 block font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
            Co zrobić z pozostałymi? Domyślnie zostawiamy je na miejscu — nie ruszamy dat, które już Ci pasowały.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {options.map((o) => (
            <Surface key={o.title} active={o.recommended} className="px-3.5 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="block font-sans text-[0.8rem] font-medium text-foreground">{o.title}</span>
                  <span className="mt-0.5 block font-sans text-[0.68rem] text-accent">{o.meta}</span>
                  <span className="mt-1 block font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
                    {o.body}
                  </span>
                </div>
                {o.recommended && <Tag>proponowane</Tag>}
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Shell>
  )
}

/* State 5 — no free slot in rhythm; system says it moved the visit and by how much. */
function NoSlotScreen({ theme }: { theme: ThemeId }) {
  const moved: Visit = { ...pkg6[3], date: "11 kwietnia" }
  const movedNote = (
    <span className="mt-2 block border-t border-border pt-2 font-sans text-[0.68rem] leading-relaxed text-muted-foreground">
      {performer} nie pracuje 9 kwietnia. Przesunęliśmy o 2 dni — najbliższy termin w rytmie to 11 kwietnia. Możesz to
      zmienić.
    </span>
  )
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={6}
      cartLabel="Pakiet · 6 wizyt"
      cartAmount="900 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 6 wizyt", price: "900 zł" }}
      action={acceptAll}
    >
      <div className="flex flex-col gap-4">
        <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
          Jedna z propozycji nie mieści się w grafiku wybranej osoby. Nie pomijamy jej po cichu — mówimy, co i o ile
          przesunęliśmy.
        </p>
        <div className="flex flex-col gap-2">
          <ProposalRow theme={theme} visit={pkg6[2]} total={6} />
          <ProposalRow theme={theme} visit={moved} total={6} changed note={movedNote} />
          <ProposalRow theme={theme} visit={pkg6[4]} total={6} />
        </div>
      </div>
    </Shell>
  )
}

/* State 6 — MOST IMPORTANT: the package cannot fit inside its validity.
   Shown as an ACCOUNT, not a verdict. Warns, never blocks. */
function ValidityScreen({ theme }: { theme: ThemeId }) {
  const ledger = [
    { label: "Potrzeba (6 wizyt co 4 tygodnie)", value: "140 dni" },
    { label: "Ważność pakietu", value: "90 dni" },
    { label: "Brakuje", value: "50 dni", strong: true },
  ]
  const exits = [
    { title: "Zmieść w ważności — co 2 tygodnie", meta: "6 wizyt w 70 dni, przed 15 kwietnia", recommended: true },
    { title: "Umów 4 teraz, 2 po odnowieniu", meta: "cztery w ważności, dwie później z panelu" },
    { title: "Weź mniejszy pakiet — 4 wizyty", meta: "660 zł · mieści się bez zmian" },
    { title: "Kup mimo to", meta: "ważność liczymy od 1. wizyty; 5 i 6 poza terminem" },
  ]
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={6}
      cartLabel="Pakiet · 6 wizyt"
      cartAmount="900 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 6 wizyt", price: "900 zł" }}
      action={<Btn>Wybierz, jak dalej</Btn>}
    >
      <div className="flex flex-col gap-4">
        {/* the account — neutral accent, never destructive red */}
        <div className="rounded-[var(--radius)] border border-accent/40 bg-accent/5 p-4">
          <Label theme={theme}>Rachunek terminów</Label>
          <div className="mt-2.5 flex flex-col divide-y divide-border">
            {ledger.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-3 py-2">
                <span
                  className={cn(
                    "font-sans text-[0.74rem]",
                    row.strong ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {row.label}
                </span>
                <span
                  className={cn(
                    "shrink-0 font-serif tabular-nums",
                    row.strong ? "text-[1rem] text-foreground" : "text-[0.9rem] text-muted-foreground",
                  )}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <span className="mt-2.5 block border-t border-border pt-2.5 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
            Nie blokujemy zakupu — pokazujemy rachunek, żebyś zdecydowała świadomie.
          </span>
        </div>

        <div>
          <Label theme={theme}>Co możesz zrobić</Label>
          <div className="mt-2.5 flex flex-col gap-2">
            {exits.map((e) => (
              <Surface key={e.title} active={e.recommended} className="px-3.5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block font-sans text-[0.78rem] font-medium text-foreground">{e.title}</span>
                    <span className="mt-0.5 block font-sans text-[0.68rem] text-muted-foreground">{e.meta}</span>
                  </div>
                  {e.recommended && <Tag>proponowane</Tag>}
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* State 4 — the skip: book the first now, the rest later; package becomes a karnet. */
function SkipScreen({ theme }: { theme: ThemeId }) {
  return (
    <Shell
      theme={theme}
      step={4}
      title={treatmentName}
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={<Btn>Umów tylko pierwszą wizytę</Btn>}
    >
      <div className="flex flex-col gap-4">
        <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">
          Nie musisz układać całego pakietu teraz. Możesz umówić pierwszą wizytę, a pozostałe zostawić na później.
        </p>
        <ProposalRow theme={theme} visit={pkg4[0]} total={4} />
        <Surface muted className="px-3.5 py-3">
          <span className="block font-sans text-[0.78rem] font-medium text-foreground">
            Pozostałe 3 wizyty umówisz z panelu, kiedy zechcesz.
          </span>
          <span className="mt-1 block font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
            Pakiet działa wtedy jak karnet — masz 4 wejścia ważne 90 dni i umawiasz je pojedynczo, tak jak zwykłą
            wizytę.
          </span>
        </Surface>
      </div>
    </Shell>
  )
}

/* Compact 6-date list for step 7 — factor out what is constant, list only dates. */
function SummaryDates({ theme, visits }: { theme: ThemeId; visits: Visit[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {visits.map((v) => (
        <div
          key={v.n}
          className={cn(
            "flex items-baseline gap-2 rounded-[var(--radius)] border px-2.5 py-2",
            v.over ? "border-dashed border-border" : "border-border",
          )}
        >
          <span className="font-mono text-[0.62rem] text-accent">{v.n}</span>
          <div className="min-w-0">
            <span
              className={cn(
                "block font-sans text-[0.72rem] font-medium",
                v.over ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {v.date}
            </span>
            {v.over && <span className="font-sans text-[0.6rem] text-muted-foreground">po ważności</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* State 7 (full) — step 7 summary with all six visits. */
function SummaryFullScreen({ theme }: { theme: ThemeId }) {
  return (
    <Shell
      theme={theme}
      step={7}
      title="Podsumowanie"
      cartCount={6}
      cartLabel="Pakiet · 6 wizyt"
      cartAmount="900 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 6 wizyt", price: "900 zł" }}
      action={<Btn>Potwierdź rezerwację</Btn>}
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="block font-serif text-[1.05rem] text-foreground">{treatmentName}</span>
          <span className="mt-1 block font-sans text-[0.72rem] text-muted-foreground">
            Co 4 tygodnie · 12:30 · {performer}
          </span>
        </div>
        <SummaryDates theme={theme} visits={pkg6} />
        <div className="flex flex-col divide-y divide-border border-t border-border">
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <span className="font-sans text-[0.74rem] text-muted-foreground">Pakiet 6 wizyt</span>
            <Money>900 zł</Money>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 py-2.5 font-sans text-[0.66rem] text-muted-foreground">
            <span>ważny 90 dni</span>
            <span aria-hidden>·</span>
            <span className="text-foreground">płatność w salonie</span>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* State 7 (skipped) — step 7 with only the first visit booked. */
function SummarySkippedScreen({ theme }: { theme: ThemeId }) {
  return (
    <Shell
      theme={theme}
      step={7}
      title="Podsumowanie"
      cartCount={4}
      cartLabel="Pakiet · 4 wizyty"
      cartAmount="660 zł"
      cartLine={{ name: treatmentName, meta: "Pakiet · 4 wizyty", price: "660 zł" }}
      action={<Btn>Potwierdź rezerwację</Btn>}
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="block font-serif text-[1.05rem] text-foreground">{treatmentName}</span>
          <span className="mt-1 block font-sans text-[0.72rem] text-muted-foreground">Pakiet 4 wizyt</span>
        </div>
        <div>
          <Label theme={theme}>Umówiona teraz</Label>
          <div className="mt-2 flex flex-col gap-2">
            <ProposalRow theme={theme} visit={pkg4[0]} total={4} right={null} />
          </div>
        </div>
        <Surface muted className="px-3.5 py-3">
          <span className="block font-sans text-[0.78rem] font-medium text-foreground">
            Zostają 3 wejścia do wykorzystania.
          </span>
          <span className="mt-1 block font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
            Pakiet działa jak karnet — pozostałe wizyty umówisz z panelu, kiedy zechcesz. Ważny 90 dni od pierwszej
            wizyty.
          </span>
        </Surface>
        <div className="flex flex-col divide-y divide-border border-t border-border">
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <span className="font-sans text-[0.74rem] text-muted-foreground">Pakiet 4 wizyt</span>
            <Money>660 zł</Money>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 py-2.5 font-sans text-[0.66rem] text-muted-foreground">
            <span>ważny 90 dni</span>
            <span aria-hidden>·</span>
            <span className="text-foreground">płatność w salonie</span>
          </div>
        </div>
      </div>
    </Shell>
  )
}

export const packageSelectDef: VariantDef = {
  id: "package-select",
  name: "Wybór pakietu i terminów",
  approach: "Krok 2 + tail · pojedyncza wizyta, pakiet i proponowane terminy",
  description:
    "Krok drugi lejka i jego dalszy ciąg. Najpierw klientka decyduje, jak kupić zabieg — pojedyncza wizyta jest domyślna, pakiet stoi obok z ceną całości, ceną za zabieg, oszczędnością i ważnością. Po wybraniu pierwszego terminu system PROPONUJE pozostałe w rytmie zabiegu (ta sama godzina i osoba), a klientka poprawia tylko to, co nie pasuje — jeden przycisk przyjmuje całość. Ekrany pokazują zmianę terminu w miejscu, złamanie rytmu jako świadomą decyzję, brak wolnego terminu, pominięcie (pakiet jako karnet) oraz najważniejszy stan: pakiet, który nie mieści się w ważności — pokazany jako rachunek dni, ostrzega, nie blokuje. Wszystko żyje w tym samym Shell lejka i tych samych prymitywach, więc themuje się we wszystkich światach bez osobnego kodu.",
  screens: [
    { title: "Krok 2 · pojedyncza wizyta (domyślnie)", render: (theme) => <PackageScreen theme={theme} selected="kobido-60" /> },
    { title: "Krok 2 · pakiet zaznaczony", render: (theme) => <PackageScreen theme={theme} selected="kobido-4" /> },
    { title: "Propozycje gotowe + „umów później”", render: (theme) => <ProposalsScreen theme={theme} /> },
    { title: "Zmiana terminu · otwarte w miejscu", render: (theme) => <ChangeOpenScreen theme={theme} /> },
    { title: "Zmiana terminu · po zmianie", render: (theme) => <ChangeDoneScreen theme={theme} /> },
    { title: "Zmiana psuje rytm · decyzja", render: (theme) => <RhythmScreen theme={theme} /> },
    { title: "Brak wolnego terminu w rytmie", render: (theme) => <NoSlotScreen theme={theme} /> },
    { title: "Pakiet nie mieści się w ważności", render: (theme) => <ValidityScreen theme={theme} /> },
    { title: "Pominięcie · pakiet jak karnet", render: (theme) => <SkipScreen theme={theme} /> },
    { title: "Krok 7 · sześć terminów", render: (theme) => <SummaryFullScreen theme={theme} /> },
    { title: "Krok 7 · pominięte, tylko pierwszy", render: (theme) => <SummarySkippedScreen theme={theme} /> },
  ],
}
