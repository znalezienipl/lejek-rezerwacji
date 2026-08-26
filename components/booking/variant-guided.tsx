import { ArrowRight, CalendarDays, ChevronRight, Plus, Sparkles } from "lucide-react"
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
  PhoneBar,
  ScreenTitle,
  SpecialistRow,
  Surface,
  Tag,
  TimeRange,
  isUpper,
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
/* Variant A — "Guided Flow"                                           */
/* One decision per screen, single column, large tap targets.          */
/* ------------------------------------------------------------------ */

function Shell({
  theme,
  step,
  children,
  footer,
}: {
  theme: ThemeId
  step: number
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="flex min-h-[560px] flex-col bg-background">
      <PhoneBar theme={theme} title={`Step ${step} of 7`} />
      {/* progress rail */}
      <div className="flex gap-1 px-4 pt-4">
        {steps.map((s) => (
          <span
            key={s.n}
            className={cn("h-0.5 flex-1 rounded-full", s.n <= step ? "bg-accent" : "bg-border")}
            aria-hidden
          />
        ))}
      </div>
      <div className="flex-1 px-5 py-6 @2xl:px-8 @2xl:py-10">
        <div className="mx-auto flex flex-col gap-6 @2xl:max-w-xl @2xl:gap-8">{children}</div>
      </div>
      <div className="border-t border-border bg-card px-5 py-4 @2xl:px-8">
        <div className="mx-auto @2xl:max-w-xl">{footer}</div>
      </div>
    </div>
  )
}

function Head({ theme, kicker, title }: { theme: ThemeId; kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label theme={theme}>{kicker}</Label>
      <ScreenTitle theme={theme} className="text-2xl @2xl:text-3xl">
        {title}
      </ScreenTitle>
    </div>
  )
}

export const guidedVariant: VariantDef = {
  id: "guided",
  name: "Guided Flow",
  approach: "Single column · one decision per screen",
  description:
    "A calm, linear wizard. Every screen asks exactly one question, uses large tap targets and keeps a persistent progress rail. On desktop the column simply centres, so the phone and the desktop journeys are identical.",
  screens: [
    /* 1 — treatment list grouped by category */
    {
      title: "Treatment list by category",
      render: (theme) => (
        <Shell theme={theme} step={1} footer={<Btn full>Continue</Btn>}>
          <Head theme={theme} kicker="Step 1" title="Which treatment would you like?" />
          <div className="flex flex-col gap-7">
            {treatmentsByCategory.map(({ category, items }) => (
              <div key={category.id} className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
                  <ScreenTitle theme={theme} as="h4" className="text-base">
                    {category.name}
                  </ScreenTitle>
                  <Label theme={theme}>{items.length} treatments</Label>
                </div>
                <p className="font-sans text-[0.72rem] text-muted-foreground">{category.caption}</p>
                {items.map((item, index) => (
                  <Surface key={item.id} active={index === 0 && category.id === "face"} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-sans text-[0.85rem] font-medium text-foreground">{item.name}</span>
                          {item.tag && <Tag>{item.tag}</Tag>}
                        </div>
                        <p className="mt-1.5 font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                        <div className="mt-2.5 flex items-center gap-3">
                          <Money className="text-sm">{item.price}</Money>
                          <Duration>{item.duration}</Duration>
                        </div>
                      </div>
                      <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden />
                    </div>
                  </Surface>
                ))}
              </div>
            ))}
          </div>
        </Shell>
      ),
    },

    /* 2 — treatment detail */
    {
      title: "Treatment details",
      render: (theme) => {
        const item = treatments[0]
        return (
          <Shell
            theme={theme}
            step={2}
            footer={
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label theme={theme}>Total</Label>
                  <Money className="block text-lg">{item.price}</Money>
                </div>
                <Btn>
                  Choose a date <ArrowRight className="size-3.5" aria-hidden />
                </Btn>
              </div>
            }
          >
            <Head theme={theme} kicker="Face & Skin" title={item.name} />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4">
              <div>
                <Label theme={theme}>Price</Label>
                <Money className="block text-lg">{item.price}</Money>
              </div>
              <div>
                <Label theme={theme}>Duration</Label>
                <span className="block font-serif text-lg text-foreground">{item.duration}</span>
              </div>
              {item.tag && (
                <div className="ml-auto">
                  <Tag>{item.tag}</Tag>
                </div>
              )}
            </div>
            <p className="font-sans text-[0.82rem] leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="flex flex-col gap-3">
              <Label theme={theme}>What it includes</Label>
              <ul className="flex flex-col gap-2">
                <Bullet>Skin diagnosis and consultation</Bullet>
                <Bullet>Double cleanse and gentle enzymatic exfoliation</Bullet>
                <Bullet>Sculpting facial massage — 20 minutes</Bullet>
                <Bullet>Bespoke mask and finishing care</Bullet>
              </ul>
            </div>
            <Surface muted className="p-4">
              <Label theme={theme}>Performed by</Label>
              <div className="mt-3 flex flex-col gap-3">
                {specialistsByTheme[theme].slice(0, 2).map((s) => (
                  <SpecialistRow key={s.id} name={s.name} role={s.role} image={s.image} rating={s.rating} />
                ))}
              </div>
            </Surface>
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
          footer={
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label theme={theme}>Selected</Label>
                <span className="block truncate font-serif text-base text-foreground">Thursday, 12 March</span>
              </div>
              <Btn>
                Pick a time <ArrowRight className="size-3.5" aria-hidden />
              </Btn>
            </div>
          }
        >
          <Head theme={theme} kicker="Step 3" title="When would you like to come?" />
          <Surface muted className="flex items-center gap-3 p-3.5">
            <Sparkles className="size-4 shrink-0 text-accent" aria-hidden />
            <p className="font-sans text-[0.72rem] leading-relaxed text-muted-foreground">
              Signature Glow Facial · 90 min — showing days with a free 90-minute block.
            </p>
          </Surface>
          <div className="flex items-center justify-between">
            <ScreenTitle theme={theme} as="h4" className="text-lg">
              March 2026
            </ScreenTitle>
            <div className="flex gap-2">
              <span className="flex size-8 items-center justify-center rounded-[var(--radius)] border border-border font-sans text-xs text-muted-foreground">
                ‹
              </span>
              <span className="flex size-8 items-center justify-center rounded-[var(--radius)] border border-border font-sans text-xs text-foreground">
                ›
              </span>
            </div>
          </div>
          <CalendarGrid theme={theme} size="airy" />
          <CalendarLegend theme={theme} />
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
            footer={
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Label theme={theme}>Selected</Label>
                  <span className="flex items-center gap-2">
                    <TimeRange from="14:30" to="16:00" />
                    <span className="truncate font-sans text-[0.7rem] text-muted-foreground">
                      · {people[2].name}
                    </span>
                  </span>
                </div>
                <Btn>
                  Continue <ArrowRight className="size-3.5" aria-hidden />
                </Btn>
              </div>
            }
          >
            <Head theme={theme} kicker="Thursday, 12 March" title="Choose a time and your specialist" />
            <div className="flex flex-col gap-3">
              <Label theme={theme}>Specialist</Label>
              <div className="flex gap-3 overflow-x-auto pb-1">
                <Surface muted className="flex shrink-0 flex-col items-center gap-2 px-4 py-3">
                  <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-foreground/30 font-sans text-[0.6rem] uppercase text-muted-foreground">
                    Any
                  </span>
                  <span className="font-sans text-[0.65rem] text-muted-foreground">Anyone</span>
                </Surface>
                {people.map((s, index) => (
                  <Surface
                    key={s.id}
                    active={index === 2}
                    className="flex w-24 shrink-0 flex-col items-center gap-2 px-3 py-3 text-center"
                  >
                    <Avatar src={s.image} alt={s.name} size={40} />
                    <span className="font-sans text-[0.65rem] font-medium leading-tight text-foreground">
                      {s.name.split(" ")[0]}
                    </span>
                  </Surface>
                ))}
              </div>
            </div>
            {[
              { label: "Morning", slots: morningSlots },
              { label: "Afternoon", slots: afternoonSlots },
            ].map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <Label theme={theme}>{group.label}</Label>
                <div className="flex flex-col gap-2">
                  {group.slots.map((slot) => {
                    const person = people[Number(slot.specialistId) % people.length]
                    const selected = slot.from === "14:30"
                    return (
                      <Surface
                        key={`${group.label}-${slot.from}`}
                        active={selected}
                        className={cn("flex items-center gap-3 p-3", slot.state === "taken" && "opacity-50")}
                      >
                        <TimeRange from={slot.from} to={slot.to} state={slot.state} className="w-28 shrink-0" />
                        <span className="h-8 w-px bg-border" aria-hidden />
                        <SpecialistRow name={person.name} role={person.role} image={person.image} size={32} />
                        {slot.state === "few" && <Tag>Last slot</Tag>}
                      </Surface>
                    )
                  })}
                </div>
              </div>
            ))}
          </Shell>
        )
      },
    },

    /* 5 — add another treatment */
    {
      title: "Add another treatment",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        const first = draftBooking.items[0]
        return (
          <Shell
            theme={theme}
            step={5}
            footer={
              <div className="flex flex-col gap-2">
                <Btn full>
                  <Plus className="size-3.5" aria-hidden /> Add another treatment
                </Btn>
                <Btn full variant="ghost">
                  No thanks, go to summary
                </Btn>
              </div>
            }
          >
            <Head theme={theme} kicker="Step 5" title="Would you like to add anything else?" />
            <Surface active className="p-4">
              <div className="flex items-center justify-between gap-3">
                <Label theme={theme}>In your booking</Label>
                <Tag>1 treatment</Tag>
              </div>
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <span className="font-sans text-[0.85rem] font-medium text-foreground">{first.name}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <TimeRange from={first.from} to={first.to} />
                  <Duration>{first.duration}</Duration>
                  <Money className="ml-auto text-sm">{first.price}</Money>
                </div>
                <SpecialistRow
                  name={people[first.specialistIndex].name}
                  role={people[first.specialistIndex].role}
                  image={people[first.specialistIndex].image}
                  size={30}
                  className="mt-1"
                />
              </div>
            </Surface>
            <div className="flex flex-col gap-3">
              <Label theme={theme}>Often added together</Label>
              {[treatments[7], treatments[10], treatments[5]].map((item) => (
                <Surface key={item.id} className="flex items-center gap-3 p-3.5">
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-sans text-[0.82rem] font-medium text-foreground">
                      {item.name}
                    </span>
                    <div className="mt-1 flex items-center gap-3">
                      <Money className="text-[0.8rem]">{item.price}</Money>
                      <Duration>{item.duration}</Duration>
                    </div>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/25 text-foreground">
                    <Plus className="size-3.5" aria-hidden />
                  </span>
                </Surface>
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
        <Shell theme={theme} step={6} footer={<Btn full>Confirm this choice</Btn>}>
          <Head theme={theme} kicker="Signature Manicure" title="When should your second treatment happen?" />
          <p className="font-sans text-[0.78rem] leading-relaxed text-muted-foreground">
            You have two treatments in this booking. Choose how you would like them arranged.
          </p>
          <div className="flex flex-col gap-4">
            {schedulingOptions.map((option) => (
              <Surface key={option.id} active={option.recommended} className="p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                      option.recommended ? "border-accent" : "border-foreground/30",
                    )}
                  >
                    {option.recommended && <span className="size-2 rounded-full bg-accent" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <ScreenTitle theme={theme} as="h4" className="text-base">
                        {option.title}
                      </ScreenTitle>
                      {option.recommended && <Tag>Recommended</Tag>}
                    </div>
                    <span className="mt-1 block font-sans text-[0.72rem] font-medium text-accent">{option.timing}</span>
                    <p className="mt-2.5 font-sans text-[0.75rem] leading-relaxed text-muted-foreground">
                      {option.explanation}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {option.points.map((point) => (
                        <Bullet key={point}>{point}</Bullet>
                      ))}
                    </ul>
                  </div>
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
            footer={
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label theme={theme}>Total · {draftBooking.totalDuration}</Label>
                  <Money className="text-xl">{draftBooking.total}</Money>
                </div>
                <Btn full>Confirm booking</Btn>
              </div>
            }
          >
            <Head theme={theme} kicker="Step 7" title="Review your booking" />
            <Surface muted className="flex items-center gap-3 p-4">
              <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden />
              <div>
                <span className="block font-serif text-base text-foreground">{draftBooking.date}</span>
                <span className="font-sans text-[0.7rem] text-muted-foreground">
                  Arrive once · in the salon {draftBooking.window}
                </span>
              </div>
            </Surface>
            <div className="flex flex-col">
              <Label theme={theme} className="mb-3">
                Your treatments
              </Label>
              {draftBooking.items.map((item, index) => {
                const person = people[item.specialistIndex]
                return (
                  <div key={item.treatmentId} className="flex gap-4">
                    {/* timeline */}
                    <div className="flex flex-col items-center pt-1.5">
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary font-sans text-[0.6rem] font-semibold text-primary-foreground">
                        {index + 1}
                      </span>
                      {index < draftBooking.items.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-border" aria-hidden />
                      )}
                    </div>
                    <div className={cn("min-w-0 flex-1", index < draftBooking.items.length - 1 && "pb-5")}>
                      <Surface className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-sans text-[0.85rem] font-medium text-foreground">{item.name}</span>
                          <Money className="shrink-0 text-sm">{item.price}</Money>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <TimeRange from={item.from} to={item.to} />
                          <Duration>{item.duration}</Duration>
                        </div>
                        <div className="mt-3 border-t border-border pt-3">
                          <Label theme={theme} className="mb-2 block">
                            Performed by
                          </Label>
                          <SpecialistRow name={person.name} role={person.role} image={person.image} size={32} />
                        </div>
                      </Surface>
                    </div>
                  </div>
                )
              })}
            </div>
            <Surface muted className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-sans text-[0.75rem] text-muted-foreground">
                  <span>Treatments (2)</span>
                  <span className="text-foreground">{draftBooking.total}</span>
                </div>
                <div className="flex justify-between font-sans text-[0.75rem] text-muted-foreground">
                  <span>Total time in salon</span>
                  <span className="text-foreground">{draftBooking.totalDuration}</span>
                </div>
                <div className="flex justify-between font-sans text-[0.75rem] text-muted-foreground">
                  <span>Arrangement</span>
                  <span className={cn("text-foreground", isUpper(theme) && "uppercase")}>Back-to-back</span>
                </div>
              </div>
            </Surface>
          </Shell>
        )
      },
    },
  ],
}
