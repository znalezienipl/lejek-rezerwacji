import { ArrowRight, Check, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import {
  Avatar,
  Btn,
  Bullet,
  CalendarGrid,
  CalendarLegend,
  Duration,
  Label,
  Money,
  ScreenTitle,
  SpecialistRow,
  Surface,
  Tag,
  TimeRange,
  type VariantDef,
} from "./shared"
import {
  afternoonSlots,
  draftBooking,
  morningSlots,
  schedulingOptions,
  specialistsByTheme,
  steps,
  treatments,
  treatmentsByCategory,
} from "@/lib/booking-data"

/* ------------------------------------------------------------------ */
/* Variant C — "Dense Overview"                                        */
/* Horizontal step tabs, wide multi-column grids, bottom summary bar.  */
/* ------------------------------------------------------------------ */

function Shell({
  theme,
  step,
  title,
  hint,
  children,
  summary,
  cta = "Continue",
}: {
  theme: ThemeId
  step: number
  title: string
  hint?: string
  children: React.ReactNode
  summary: React.ReactNode
  cta?: string
}) {
  return (
    <div className="flex min-h-[560px] flex-col bg-background">
      {/* ---------- header: brand row + horizontal step tabs ---------- */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 @2xl:px-6">
          <Label theme={theme}>Online booking</Label>
          <span className="font-mono text-[0.6rem] text-muted-foreground">
            {step}/7
          </span>
        </div>
        <div className="flex gap-0 overflow-x-auto border-t border-border">
          {steps.map((s) => {
            const done = s.n < step
            const active = s.n === step
            return (
              <span
                key={s.n}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 font-sans text-[0.65rem] whitespace-nowrap",
                  active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full text-[0.55rem] font-semibold",
                    done ? "bg-accent text-accent-foreground" : active ? "bg-primary text-primary-foreground" : "border border-border",
                  )}
                >
                  {done ? <Check className="size-2.5" /> : s.n}
                </span>
                {s.label}
              </span>
            )
          })}
        </div>
      </header>

      {/* ---------- title bar ---------- */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-5 @2xl:px-6">
        <ScreenTitle theme={theme} className="text-xl @2xl:text-2xl">
          {title}
        </ScreenTitle>
        {hint && <span className="font-sans text-[0.68rem] text-muted-foreground">{hint}</span>}
      </div>

      {/* ---------- dense content ---------- */}
      <div className="flex-1 px-4 py-4 @2xl:px-6 @2xl:py-5">{children}</div>

      {/* ---------- bottom summary bar ---------- */}
      <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 @2xl:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1">{summary}</div>
        <Btn className="ml-auto">
          {cta} <ArrowRight className="size-3.5" aria-hidden />
        </Btn>
      </div>
    </div>
  )
}

function Stat({ theme, k, v }: { theme: ThemeId; k: string; v: string }) {
  return (
    <span className="flex flex-col">
      <Label theme={theme} className="text-[0.55rem]">
        {k}
      </Label>
      <span className="font-sans text-[0.78rem] text-foreground">{v}</span>
    </span>
  )
}

export const denseVariant: VariantDef = {
  id: "dense",
  name: "Dense Overview",
  approach: "Wide grids · maximum information per screen"
    ,
  description:
    "An information-first approach for clients who want to see everything at once. Steps run as horizontal tabs, content spreads into wide multi-column grids of compact tiles, and a sticky bottom bar always carries the running total. Mobile keeps the same density in two columns.",
  screens: [
    /* 1 — treatment list grouped by category */
    {
      title: "Treatment list by category",
      render: (theme) => (
        <Shell
          theme={theme}
          step={1}
          title="Choose a treatment"
          hint="12 treatments in 4 categories"
          summary={<Stat theme={theme} k="Selected" v="Signature Glow Facial · 480 zł" />}
        >
          <div className="flex flex-col gap-5">
            {treatmentsByCategory.map(({ category, items }) => (
              <div key={category.id}>
                <div className="mb-2 flex items-baseline gap-3 border-b border-border pb-1.5">
                  <Label theme={theme}>{category.name}</Label>
                  <span className="font-sans text-[0.62rem] text-muted-foreground">{category.caption}</span>
                  <span className="ml-auto font-mono text-[0.6rem] text-muted-foreground">{items.length}</span>
                </div>
                {/* compact tile grid — 2 cols on phone, 4 on desktop */}
                <div className="grid grid-cols-2 gap-2 @2xl:grid-cols-4">
                  {items.map((item, index) => {
                    const selected = index === 0 && category.id === "face"
                    return (
                      <Surface key={item.id} active={selected} className="flex flex-col gap-1.5 p-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="font-sans text-[0.72rem] font-medium leading-snug text-foreground">
                            {item.name}
                          </span>
                          {selected && <Check className="mt-0.5 size-3 shrink-0 text-accent" aria-hidden />}
                        </div>
                        {item.tag && <Tag>{item.tag}</Tag>}
                        <div className="mt-auto flex items-baseline justify-between gap-2 pt-1">
                          <Money className="text-[0.8rem]">{item.price}</Money>
                          <span className="font-mono text-[0.58rem] text-muted-foreground">{item.duration}</span>
                        </div>
                      </Surface>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Shell>
      ),
    },

    /* 2 — details */
    {
      title: "Treatment details",
      render: (theme) => {
        const item = treatments[0]
        const people = specialistsByTheme[theme]
        return (
          <Shell
            theme={theme}
            step={2}
            title={item.name}
            hint="Face & Skin"
            cta="Choose a date"
            summary={
              <>
                <Stat theme={theme} k="Price" v={item.price} />
                <Stat theme={theme} k="Duration" v={item.duration} />
              </>
            }
          >
            <div className="grid gap-4 @2xl:grid-cols-3">
              <div className="flex flex-col gap-3 @2xl:col-span-2">
                <p className="font-sans text-[0.78rem] leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Price", item.price],
                    ["Duration", item.duration],
                    ["Category", "Face & Skin"],
                    ["Cancellation", "24 h free"],
                  ].map(([k, v]) => (
                    <Surface key={k} muted className="p-2.5">
                      <Label theme={theme} className="text-[0.55rem]">
                        {k}
                      </Label>
                      <span className="mt-0.5 block font-serif text-[0.95rem] text-foreground">{v}</span>
                    </Surface>
                  ))}
                </div>
                <div className="grid gap-4 @2xl:grid-cols-2">
                  <div>
                    <Label theme={theme}>Includes</Label>
                    <ul className="mt-2 flex flex-col gap-1">
                      <Bullet>Skin diagnosis</Bullet>
                      <Bullet>Double cleanse and exfoliation</Bullet>
                      <Bullet>Sculpting massage — 20 min</Bullet>
                      <Bullet>Bespoke mask</Bullet>
                    </ul>
                  </div>
                  <div>
                    <Label theme={theme}>Good to know</Label>
                    <div className="mt-2 divide-y divide-border border-y border-border">
                      {[
                        ["Prep", "No make-up"],
                        ["After", "No sun 24 h"],
                        ["Frequency", "Every 4–6 weeks"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-3 py-1.5">
                          <span className="font-sans text-[0.66rem] text-muted-foreground">{k}</span>
                          <span className="font-sans text-[0.68rem] text-foreground">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label theme={theme}>Specialists ({people.length})</Label>
                {people.map((s) => (
                  <Surface key={s.id} className="p-2.5">
                    <SpecialistRow name={s.name} role={s.role} image={s.image} rating={s.rating} size={30} />
                  </Surface>
                ))}
              </div>
            </div>
          </Shell>
        )
      },
    },

    /* 3 — date */
    {
      title: "Date selection",
      render: (theme) => (
        <Shell
          theme={theme}
          step={3}
          title="Pick a date"
          hint="Showing days with a free 90-minute block"
          cta="Pick a time"
          summary={
            <>
              <Stat theme={theme} k="Treatment" v="Signature Glow Facial" />
              <Stat theme={theme} k="Date" v="Thu, 12 March" />
            </>
          }
        >
          <div className="grid gap-4 @2xl:grid-cols-3">
            <Surface className="p-3 @2xl:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <ScreenTitle theme={theme} as="h4" className="text-sm">
                  March 2026
                </ScreenTitle>
                <span className="flex gap-1.5">
                  <span className="flex size-6 items-center justify-center rounded-[var(--radius)] border border-border text-[0.65rem] text-muted-foreground">
                    ‹
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-[var(--radius)] border border-border text-[0.65rem] text-foreground">
                    ›
                  </span>
                </span>
              </div>
              <CalendarGrid theme={theme} size="compact" />
              <div className="mt-3 border-t border-border pt-3">
                <CalendarLegend theme={theme} />
              </div>
            </Surface>
            <div className="flex flex-col gap-2">
              <Label theme={theme}>Soonest availability</Label>
              {[
                ["Tue, 10 Mar", "3 slots", "09:00 – 17:30"],
                ["Thu, 12 Mar", "7 slots", "09:00 – 19:00"],
                ["Fri, 13 Mar", "5 slots", "10:00 – 18:00"],
                ["Sat, 14 Mar", "2 slots", "10:00 – 14:00"],
              ].map(([day, count, range], index) => (
                <Surface key={day} active={index === 1} className="flex items-center justify-between gap-2 p-2.5">
                  <span className="min-w-0">
                    <span className="block font-sans text-[0.72rem] font-medium text-foreground">{day}</span>
                    <span className="font-mono text-[0.58rem] text-muted-foreground">{range}</span>
                  </span>
                  <span className="shrink-0 font-sans text-[0.62rem] text-accent">{count}</span>
                </Surface>
              ))}
            </div>
          </div>
        </Shell>
      ),
    },

    /* 4 — time + specialist */
    {
      title: "Time & specialist",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        return (
          <Shell
            theme={theme}
            step={4}
            title="Time & specialist"
            hint="All times shown as start – end"
            summary={
              <>
                <Stat theme={theme} k="Time" v="14:30 – 16:00" />
                <Stat theme={theme} k="With" v={people[2].name} />
              </>
            }
          >
            <div className="flex flex-col gap-4">
              {/* specialist strip */}
              <div>
                <Label theme={theme}>Specialist</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 @2xl:grid-cols-4">
                  <Surface muted className="flex items-center gap-2 p-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-foreground/30 font-sans text-[0.5rem] uppercase text-muted-foreground">
                      Any
                    </span>
                    <span className="font-sans text-[0.68rem] text-foreground">Anyone</span>
                  </Surface>
                  {people.map((s, index) => (
                    <Surface key={s.id} active={index === 2} className="flex items-center gap-2 p-2">
                      <Avatar src={s.image} alt={s.name} size={28} />
                      <span className="min-w-0">
                        <span className="block truncate font-sans text-[0.68rem] font-medium text-foreground">
                          {s.name}
                        </span>
                        <span className="block truncate font-mono text-[0.55rem] text-muted-foreground">
                          ★ {s.rating}
                        </span>
                      </span>
                    </Surface>
                  ))}
                </div>
              </div>
              {/* slot grid */}
              {[
                { label: "Morning", slots: morningSlots },
                { label: "Afternoon", slots: afternoonSlots },
              ].map((group) => (
                <div key={group.label}>
                  <Label theme={theme}>{group.label}</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2 @2xl:grid-cols-4">
                    {group.slots.map((slot) => {
                      const person = people[Number(slot.specialistId) % people.length]
                      const selected = slot.from === "14:30"
                      return (
                        <Surface
                          key={`${group.label}-${slot.from}`}
                          active={selected}
                          className={cn("flex flex-col gap-1.5 p-2.5", slot.state === "taken" && "opacity-45")}
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <TimeRange from={slot.from} to={slot.to} state={slot.state} className="text-[0.72rem]" />
                            {slot.state === "few" && <Tag>1</Tag>}
                            {selected && <Check className="size-3 shrink-0 text-accent" aria-hidden />}
                          </div>
                          <div className="flex items-center gap-1.5 border-t border-border pt-1.5">
                            <Avatar src={person.image} alt={person.name} size={18} />
                            <span className="truncate font-sans text-[0.6rem] text-muted-foreground">
                              {person.name.split(" ")[0]}
                            </span>
                          </div>
                        </Surface>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        )
      },
    },

    /* 5 — add another */
    {
      title: "Add another treatment",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        const first = draftBooking.items[0]
        return (
          <Shell
            theme={theme}
            step={5}
            title="Add another treatment"
            hint="Pick as many as you like — we arrange them for you"
            cta="Go to summary"
            summary={
              <>
                <Stat theme={theme} k="In booking" v="2 treatments" />
                <Stat theme={theme} k="Total" v={draftBooking.total} />
              </>
            }
          >
            <div className="flex flex-col gap-4">
              {/* current booking strip */}
              <Surface active className="flex flex-wrap items-center gap-x-5 gap-y-2 p-3">
                <Label theme={theme}>Already added</Label>
                <span className="font-sans text-[0.75rem] font-medium text-foreground">{first.name}</span>
                <TimeRange from={first.from} to={first.to} className="text-[0.72rem]" />
                <span className="flex items-center gap-1.5">
                  <Avatar src={people[first.specialistIndex].image} alt={people[first.specialistIndex].name} size={20} />
                  <span className="font-sans text-[0.66rem] text-muted-foreground">
                    {people[first.specialistIndex].name}
                  </span>
                </span>
                <Money className="ml-auto text-[0.85rem]">{first.price}</Money>
              </Surface>
              {/* all categories, compact, add buttons */}
              {treatmentsByCategory.slice(0, 3).map(({ category, items }) => (
                <div key={category.id}>
                  <div className="mb-2 flex items-baseline gap-3 border-b border-border pb-1.5">
                    <Label theme={theme}>{category.name}</Label>
                    <span className="ml-auto font-mono text-[0.6rem] text-muted-foreground">{items.length}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 @2xl:grid-cols-4">
                    {items.map((item) => {
                      const added = item.id === "signature-manicure"
                      return (
                        <Surface key={item.id} active={added} className="flex flex-col gap-1.5 p-2.5">
                          <span className="font-sans text-[0.7rem] font-medium leading-snug text-foreground">
                            {item.name}
                          </span>
                          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                            <span className="flex flex-col">
                              <Money className="text-[0.78rem]">{item.price}</Money>
                              <span className="font-mono text-[0.55rem] text-muted-foreground">{item.duration}</span>
                            </span>
                            <span
                              className={cn(
                                "flex size-6 shrink-0 items-center justify-center rounded-[var(--radius)] border",
                                added
                                  ? "border-transparent bg-primary text-primary-foreground"
                                  : "border-border text-foreground",
                              )}
                            >
                              {added ? <Check className="size-3" aria-hidden /> : <Plus className="size-3" aria-hidden />}
                            </span>
                          </div>
                        </Surface>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        )
      },
    },

    /* 6 — scheduling choice */
    {
      title: "Back-to-back or another day",
      render: (theme) => (
        <Shell
          theme={theme}
          step={6}
          title="When should the second treatment happen?"
          hint="Signature Manicure · 75 min"
          cta="Confirm choice"
          summary={<Stat theme={theme} k="Chosen" v="Right after the first · 16:00 – 17:15" />}
        >
          <div className="grid gap-3 @2xl:grid-cols-2">
            {schedulingOptions.map((option) => (
              <Surface key={option.id} active={option.recommended} className="flex flex-col p-4">
                <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                        option.recommended ? "border-accent" : "border-foreground/30",
                      )}
                    >
                      {option.recommended && <span className="size-2 rounded-full bg-accent" />}
                    </span>
                    <div>
                      <ScreenTitle theme={theme} as="h4" className="text-[0.95rem]">
                        {option.title}
                      </ScreenTitle>
                      <span className="mt-0.5 block font-sans text-[0.66rem] font-medium text-accent">
                        {option.timing}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[0.58rem] uppercase text-muted-foreground">
                    {option.summary}
                  </span>
                </div>
                <p className="mt-3 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
                  {option.explanation}
                </p>
                <ul className="mt-3 flex flex-col gap-1">
                  {option.points.map((point) => (
                    <Bullet key={point}>{point}</Bullet>
                  ))}
                </ul>
                {/* timeline diagram */}
                <div className="mt-4 border-t border-border pt-3">
                  <Label theme={theme} className="text-[0.55rem]">
                    Your schedule
                  </Label>
                  {option.id === "back-to-back" ? (
                    <>
                      <div className="mt-2 flex items-center gap-0.5">
                        <span className="h-5 flex-[3] rounded-l-[var(--radius)] bg-primary/85" aria-hidden />
                        <span className="h-5 flex-[2.5] rounded-r-[var(--radius)] bg-accent/70" aria-hidden />
                      </div>
                      <div className="mt-1 flex justify-between font-mono text-[0.55rem] text-muted-foreground">
                        <span>14:30</span>
                        <span>16:00</span>
                        <span>17:15</span>
                      </div>
                      <span className="mt-1.5 block font-sans text-[0.62rem] text-foreground">
                        Thursday 12 March only — one visit of 2 h 45 min
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="mt-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-14 shrink-0 font-mono text-[0.55rem] text-muted-foreground">12 Mar</span>
                          <span className="h-4 flex-[3] rounded-[var(--radius)] bg-primary/85" aria-hidden />
                          <span className="shrink-0 font-mono text-[0.55rem] text-muted-foreground">90 min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-14 shrink-0 font-mono text-[0.55rem] text-muted-foreground">19 Mar</span>
                          <span className="h-4 flex-[2.5] rounded-[var(--radius)] bg-accent/70" aria-hidden />
                          <span className="shrink-0 font-mono text-[0.55rem] text-muted-foreground">75 min</span>
                        </div>
                      </div>
                      <span className="mt-1.5 block font-sans text-[0.62rem] text-foreground">
                        Two separate visits on different days
                      </span>
                    </>
                  )}
                </div>
              </Surface>
            ))}
          </div>
        </Shell>
      ),
    },

    /* 7 — summary */
    {
      title: "Booking summary",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        return (
          <Shell
            theme={theme}
            step={7}
            title="Review your booking"
            hint={`${draftBooking.date} · ${draftBooking.window}`}
            cta="Confirm booking"
            summary={
              <>
                <Stat theme={theme} k="Treatments" v="2" />
                <Stat theme={theme} k="Total time" v={draftBooking.totalDuration} />
                <Stat theme={theme} k="Total" v={draftBooking.total} />
              </>
            }
          >
            <div className="grid gap-4 @2xl:grid-cols-3">
              {/* treatment table — who does what and when */}
              <div className="@2xl:col-span-2">
                <Label theme={theme}>Treatments · who and when</Label>
                <div className="mt-2 overflow-hidden rounded-[var(--radius)] border border-border">
                  {/* table header (desktop only) */}
                  <div className="hidden border-b border-border bg-secondary/50 @2xl:grid @2xl:grid-cols-[24px_1fr_120px_1fr_70px] @2xl:gap-3 @2xl:px-3 @2xl:py-2">
                    {["#", "Treatment", "Time", "Specialist", "Price"].map((h) => (
                      <Label key={h} theme={theme} className="text-[0.55rem]">
                        {h}
                      </Label>
                    ))}
                  </div>
                  <div className="divide-y divide-border">
                    {draftBooking.items.map((item, index) => {
                      const person = people[item.specialistIndex]
                      return (
                        <div
                          key={item.treatmentId}
                          className="flex flex-col gap-2 p-3 @2xl:grid @2xl:grid-cols-[24px_1fr_120px_1fr_70px] @2xl:items-center @2xl:gap-3"
                        >
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.55rem] font-semibold text-primary-foreground">
                            {index + 1}
                          </span>
                          <span className="font-sans text-[0.78rem] font-medium text-foreground">{item.name}</span>
                          <span className="flex flex-col">
                            <TimeRange from={item.from} to={item.to} className="text-[0.72rem]" />
                            <span className="font-mono text-[0.55rem] text-muted-foreground">{item.duration}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <Avatar src={person.image} alt={person.name} size={22} />
                            <span className="min-w-0">
                              <span className="block truncate font-sans text-[0.7rem] text-foreground">
                                {person.name}
                              </span>
                              <span className="block truncate font-mono text-[0.55rem] text-muted-foreground">
                                {person.role}
                              </span>
                            </span>
                          </span>
                          <Money className="text-[0.8rem] @2xl:text-right">{item.price}</Money>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* day timeline */}
                <div className="mt-4">
                  <Label theme={theme}>Your day</Label>
                  <div className="mt-2 flex items-center gap-0.5">
                    <span className="h-6 flex-[3] rounded-l-[var(--radius)] bg-primary/85" aria-hidden />
                    <span className="h-6 flex-[2.5] rounded-r-[var(--radius)] bg-accent/70" aria-hidden />
                  </div>
                  <div className="mt-1 flex justify-between font-mono text-[0.58rem] text-muted-foreground">
                    <span>14:30 arrive</span>
                    <span>16:00 switch</span>
                    <span>17:15 done</span>
                  </div>
                </div>
              </div>
              {/* totals column */}
              <div className="flex flex-col gap-2">
                <Surface className="p-3">
                  <Label theme={theme}>Summary</Label>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {[
                      ["Signature Glow Facial", "480 zł"],
                      ["Signature Manicure", "220 zł"],
                      ["Arrangement", "Back-to-back"],
                      ["Total time", draftBooking.totalDuration],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3 font-sans text-[0.68rem]">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between border-t border-border pt-2.5">
                    <Label theme={theme}>Due</Label>
                    <Money className="text-lg">{draftBooking.total}</Money>
                  </div>
                </Surface>
                <Surface muted className="p-3">
                  <ul className="flex flex-col gap-1">
                    <Bullet>Free cancellation up to 24 h before</Bullet>
                    <Bullet>Pay in the salon</Bullet>
                    <Bullet>Confirmation by SMS and email</Bullet>
                  </ul>
                </Surface>
              </div>
            </div>
          </Shell>
        )
      },
    },
  ],
}
