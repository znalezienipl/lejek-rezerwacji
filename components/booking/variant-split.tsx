import { ArrowRight, Check, ChevronDown, Plus } from "lucide-react"
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
  categories,
  draftBooking,
  morningSlots,
  schedulingOptions,
  specialistsByTheme,
  steps,
  treatments,
  treatmentsByCategory,
} from "@/lib/booking-data"

/* ------------------------------------------------------------------ */
/* Variant B — "Split Panel"                                           */
/* Persistent left rail (steps + live cart), list-based right panel.   */
/* ------------------------------------------------------------------ */

function Cart({
  theme,
  count = 1,
  cartLine,
  cartAmount,
}: {
  theme: ThemeId
  count?: number
  /** When set, the cart shows ONE summarised line (e.g. a package) instead of itemised visits. */
  cartLine?: { name: string; meta: string; price: string }
  /** Overrides the computed total (e.g. the package price). */
  cartAmount?: string
}) {
  const people = specialistsByTheme[theme]
  const items = draftBooking.items.slice(0, count)
  return (
    <Surface className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label theme={theme}>Your booking</Label>
        <Tag>{count}</Tag>
      </div>
      <div className="mt-3 flex flex-col divide-y divide-border border-t border-border">
        {cartLine ? (
          <div className="py-3">
            <span className="block font-sans text-[0.75rem] font-medium leading-snug text-foreground">
              {cartLine.name}
            </span>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <span className="font-sans text-[0.7rem] text-muted-foreground">{cartLine.meta}</span>
              <Money className="text-[0.8rem]">{cartLine.price}</Money>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.treatmentId} className="py-3">
              <span className="block font-sans text-[0.75rem] font-medium leading-snug text-foreground">
                {item.name}
              </span>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <TimeRange from={item.from} to={item.to} className="text-[0.7rem]" />
                <Money className="text-[0.8rem]">{item.price}</Money>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Avatar src={people[item.specialistIndex].image} alt={people[item.specialistIndex].name} size={20} />
                <span className="truncate font-sans text-[0.65rem] text-muted-foreground">
                  {people[item.specialistIndex].name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <Label theme={theme}>Total</Label>
        <Money>{cartAmount ?? (count > 1 ? draftBooking.total : items[0].price)}</Money>
      </div>
    </Surface>
  )
}

export function Shell({
  theme,
  step,
  title,
  children,
  cartCount = 1,
  cartLine,
  cartAmount,
  cartLabel,
  action,
}: {
  theme: ThemeId
  step: number
  title: string
  children: React.ReactNode
  cartCount?: number
  /** One summarised cart line (packages) instead of itemised visits. */
  cartLine?: { name: string; meta: string; price: string }
  /** Overrides the cart total shown on desktop and mobile. */
  cartAmount?: string
  /** Overrides the mobile "{n} in booking" label (e.g. "Pakiet · 6 wizyt"). */
  cartLabel?: string
  action: React.ReactNode
}) {
  return (
    <div className="flex min-h-[560px] flex-col bg-background @2xl:grid @2xl:grid-cols-[236px_1fr] @2xl:items-start">
      {/* ---------- left rail: desktop ---------- */}
      <aside className="hidden h-full flex-col gap-6 border-r border-border bg-card p-6 @2xl:flex">
        <div>
          <Label theme={theme}>Booking</Label>
          <ScreenTitle theme={theme} as="h4" className="mt-1 text-lg">
            New appointment
          </ScreenTitle>
        </div>
        <ol className="flex flex-col gap-0.5">
          {steps.map((s) => {
            const done = s.n < step
            const active = s.n === step
            return (
              <li
                key={s.n}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius)] px-2.5 py-2",
                  active && "bg-secondary/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full font-sans text-[0.6rem] font-semibold",
                    done
                      ? "bg-accent text-accent-foreground"
                      : active
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-3" /> : s.n}
                </span>
                <span
                  className={cn(
                    "font-sans text-[0.72rem]",
                    active ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </li>
            )
          })}
        </ol>
        <div className="mt-auto">
          <Cart theme={theme} count={cartCount} cartLine={cartLine} cartAmount={cartAmount} />
        </div>
      </aside>

      {/* ---------- mobile: compact step strip + collapsed cart ---------- */}
      <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 @2xl:hidden">
        <div className="flex items-center gap-2 overflow-x-auto">
          {steps.map((s) => (
            <span
              key={s.n}
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full font-sans text-[0.6rem] font-semibold",
                s.n < step
                  ? "bg-accent text-accent-foreground"
                  : s.n === step
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground",
              )}
            >
              {s.n < step ? <Check className="size-3" aria-hidden /> : s.n}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border pt-2.5">
          <span className="flex items-center gap-2">
            <Label theme={theme}>{cartLabel ?? `${cartCount} in booking`}</Label>
            <ChevronDown className="size-3 text-muted-foreground" aria-hidden />
          </span>
          <Money className="text-sm">
            {cartAmount ?? (cartCount > 1 ? draftBooking.total : draftBooking.items[0].price)}
          </Money>
        </div>
      </div>

      {/* ---------- right panel ---------- */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 @2xl:px-8 @2xl:py-5">
          <div className="min-w-0">
            <Label theme={theme}>Step {step}</Label>
            <ScreenTitle theme={theme} className="mt-0.5 truncate text-lg @2xl:text-xl">
              {title}
            </ScreenTitle>
          </div>
          <div className="hidden shrink-0 @2xl:block">{action}</div>
        </div>
        <div className="flex-1 px-5 py-5 @2xl:px-8 @2xl:py-7">{children}</div>
        <div className="border-t border-border px-5 py-4 @2xl:hidden">{action}</div>
      </main>
    </div>
  )
}

export const splitVariant: VariantDef = {
  id: "split",
  name: "Split Panel",
  approach: "Two columns · persistent steps and live cart",
  description:
    "A control-panel approach. A fixed left rail always shows where you are and what is already in the booking, while the right panel presents options as dense, scannable list rows. On mobile the rail collapses into a compact step strip with a summary bar.",
  screens: [
    /* 1 — treatment list grouped by category */
    {
      title: "Treatment list by category",
      render: (theme) => (
        <Shell
          theme={theme}
          step={1}
          title="Choose a treatment"
          action={
            <Btn>
              Continue <ArrowRight className="size-3.5" aria-hidden />
            </Btn>
          }
        >
          {/* category filter row */}
          <div className="mb-5 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={category.id}
                className={cn(
                  "rounded-[var(--radius)] border px-3 py-1.5 font-sans text-[0.68rem]",
                  index === 0
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {category.name}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {treatmentsByCategory.map(({ category, items }) => (
              <div key={category.id}>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <Label theme={theme}>{category.name}</Label>
                  <span className="font-sans text-[0.65rem] text-muted-foreground">{category.caption}</span>
                </div>
                {/* dense list rows */}
                <div className="divide-y divide-border border-y border-border">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-4 px-1 py-3",
                        index === 0 && category.id === "face" && "bg-secondary/40",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-sans text-[0.8rem] font-medium text-foreground">{item.name}</span>
                          {item.tag && <Tag>{item.tag}</Tag>}
                        </span>
                        <p className="mt-0.5 line-clamp-1 font-sans text-[0.68rem] text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Duration className="hidden shrink-0 @2xl:inline-flex">{item.duration}</Duration>
                      <Money className="shrink-0 text-[0.85rem]">{item.price}</Money>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border text-foreground">
                        <Plus className="size-3" aria-hidden />
                      </span>
                    </div>
                  ))}
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
        return (
          <Shell
            theme={theme}
            step={2}
            title={item.name}
            action={
              <Btn>
                Choose a date <ArrowRight className="size-3.5" aria-hidden />
              </Btn>
            }
          >
            <div className="grid gap-6 @2xl:grid-cols-[1fr_260px]">
              <div className="flex flex-col gap-5">
                <p className="font-sans text-[0.8rem] leading-relaxed text-muted-foreground">{item.description}</p>
                <div>
                  <Label theme={theme}>What it includes</Label>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    <Bullet>Skin diagnosis and consultation</Bullet>
                    <Bullet>Double cleanse and enzymatic exfoliation</Bullet>
                    <Bullet>Sculpting facial massage — 20 minutes</Bullet>
                    <Bullet>Bespoke mask and finishing care</Bullet>
                  </ul>
                </div>
                <div>
                  <Label theme={theme}>Good to know</Label>
                  <div className="mt-2.5 divide-y divide-border border-y border-border">
                    {[
                      ["Preparation", "Come without make-up if possible"],
                      ["Aftercare", "Avoid direct sun for 24 hours"],
                      ["Cancellation", "Free up to 24 hours before"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                        <span className="font-sans text-[0.7rem] text-muted-foreground">{k}</span>
                        <span className="text-right font-sans text-[0.72rem] text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* fact panel */}
              <div className="flex flex-col gap-4">
                <Surface muted className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <Label theme={theme}>Price</Label>
                      <Money className="text-lg">{item.price}</Money>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-border pt-3">
                      <Label theme={theme}>Duration</Label>
                      <span className="font-serif text-lg text-foreground">{item.duration}</span>
                    </div>
                  </div>
                </Surface>
                <Surface className="p-4">
                  <Label theme={theme}>Available specialists</Label>
                  <div className="mt-3 flex flex-col gap-3">
                    {specialistsByTheme[theme].slice(0, 2).map((s) => (
                      <SpecialistRow key={s.id} name={s.name} role={s.role} image={s.image} size={32} />
                    ))}
                  </div>
                </Surface>
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
          action={
            <Btn>
              Pick a time <ArrowRight className="size-3.5" aria-hidden />
            </Btn>
          }
        >
          <div className="grid gap-6 @2xl:grid-cols-[1fr_240px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <ScreenTitle theme={theme} as="h4" className="text-base">
                  March 2026
                </ScreenTitle>
                <div className="flex gap-2">
                  <span className="flex size-7 items-center justify-center rounded-[var(--radius)] border border-border text-xs text-muted-foreground">
                    ‹
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-[var(--radius)] border border-border text-xs text-foreground">
                    ›
                  </span>
                </div>
              </div>
              <CalendarGrid theme={theme} size="comfortable" />
              <CalendarLegend theme={theme} />
            </div>
            <div className="flex flex-col gap-4">
              <Surface active className="p-4">
                <Label theme={theme}>Selected date</Label>
                <span className="mt-1 block font-serif text-base text-foreground">Thursday, 12 March</span>
                <span className="font-sans text-[0.68rem] text-muted-foreground">7 free slots</span>
              </Surface>
              <div>
                <Label theme={theme}>Next available</Label>
                <div className="mt-2 divide-y divide-border border-y border-border">
                  {[
                    ["Tue, 10 March", "3 slots"],
                    ["Thu, 12 March", "7 slots"],
                    ["Fri, 13 March", "5 slots"],
                  ].map(([day, count]) => (
                    <div key={day} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="font-sans text-[0.72rem] text-foreground">{day}</span>
                      <span className="font-sans text-[0.65rem] text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
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
            action={
              <Btn>
                Continue <ArrowRight className="size-3.5" aria-hidden />
              </Btn>
            }
          >
            <div className="grid gap-6 @2xl:grid-cols-[220px_1fr]">
              {/* specialist column */}
              <div className="flex flex-col gap-2">
                <Label theme={theme}>Specialist</Label>
                <div className="flex flex-col gap-2">
                  <Surface muted className="flex items-center gap-3 p-2.5">
                    <span className="flex size-8 items-center justify-center rounded-full border border-dashed border-foreground/30 font-sans text-[0.55rem] uppercase text-muted-foreground">
                      Any
                    </span>
                    <span className="font-sans text-[0.72rem] text-foreground">Anyone available</span>
                  </Surface>
                  {people.map((s, index) => (
                    <Surface key={s.id} active={index === 2} className="p-2.5">
                      <SpecialistRow name={s.name} role={s.role} image={s.image} rating={s.rating} size={32} />
                    </Surface>
                  ))}
                </div>
              </div>
              {/* slot column */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <Label theme={theme}>Thursday, 12 March</Label>
                  <span className="font-sans text-[0.65rem] text-muted-foreground">Times shown as start – end</span>
                </div>
                {[
                  { label: "Morning", slots: morningSlots },
                  { label: "Afternoon", slots: afternoonSlots },
                ].map((group) => (
                  <div key={group.label}>
                    <Label theme={theme}>{group.label}</Label>
                    <div className="mt-2 divide-y divide-border border-y border-border">
                      {group.slots.map((slot) => {
                        const person = people[Number(slot.specialistId) % people.length]
                        const selected = slot.from === "14:30"
                        return (
                          <div
                            key={`${group.label}-${slot.from}`}
                            className={cn(
                              "flex items-center gap-3 px-1 py-2.5",
                              selected && "bg-secondary/50",
                              slot.state === "taken" && "opacity-45",
                            )}
                          >
                            <TimeRange from={slot.from} to={slot.to} state={slot.state} className="w-24 shrink-0" />
                            <Avatar src={person.image} alt={person.name} size={24} />
                            <span className="min-w-0 flex-1 truncate font-sans text-[0.72rem] text-muted-foreground">
                              {person.name}
                            </span>
                            {slot.state === "few" && <Tag>Last</Tag>}
                            {selected && <Check className="size-3.5 shrink-0 text-accent" aria-hidden />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Shell>
        )
      },
    },

    /* 5 — add another */
    {
      title: "Add another treatment",
      render: (theme) => (
        <Shell
          theme={theme}
          step={5}
          title="Add another treatment"
          action={<Btn>Go to summary</Btn>}
        >
          <div className="grid gap-6 @2xl:grid-cols-[1fr_240px]">
            <div className="flex flex-col gap-5">
              <p className="font-sans text-[0.78rem] leading-relaxed text-muted-foreground">
                Your booking currently has one treatment. Add more now and we will arrange them together.
              </p>
              <div>
                <Label theme={theme}>Suggested with Signature Glow Facial</Label>
                <div className="mt-2 divide-y divide-border border-y border-border">
                  {[treatments[7], treatments[10], treatments[5], treatments[9]].map((item, index) => (
                    <div
                      key={item.id}
                      className={cn("flex items-center gap-4 px-1 py-3", index === 0 && "bg-secondary/40")}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="block truncate font-sans text-[0.8rem] font-medium text-foreground">
                          {item.name}
                        </span>
                        <Duration className="mt-0.5">{item.duration}</Duration>
                      </div>
                      <Money className="shrink-0 text-[0.85rem]">{item.price}</Money>
                      <span
                        className={cn(
                          "flex shrink-0 items-center gap-1.5 rounded-[var(--radius)] border px-2.5 py-1.5 font-sans text-[0.62rem] uppercase tracking-[0.1em]",
                          index === 0
                            ? "border-transparent bg-primary text-primary-foreground"
                            : "border-foreground/25 text-foreground",
                        )}
                      >
                        {index === 0 ? <Check className="size-3" aria-hidden /> : <Plus className="size-3" aria-hidden />}
                        {index === 0 ? "Added" : "Add"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="@2xl:hidden">
              <Cart theme={theme} count={2} />
            </div>
            <div className="hidden @2xl:block">
              <Surface active className="p-4">
                <Label theme={theme}>Booking now has</Label>
                <div className="mt-3 flex flex-col gap-2.5">
                  {draftBooking.items.map((item, index) => (
                    <div key={item.treatmentId} className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-[0.6rem] text-accent">{index + 1}</span>
                      <span className="font-sans text-[0.72rem] leading-snug text-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <Label theme={theme}>Total</Label>
                  <Money>{draftBooking.total}</Money>
                </div>
              </Surface>
            </div>
          </div>
        </Shell>
      ),
    },

    /* 6 — scheduling choice */
    {
      title: "Back-to-back or another day",
      render: (theme) => (
        <Shell theme={theme} step={6} title="When should it happen?" cartCount={2} action={<Btn>Confirm choice</Btn>}>
          <p className="mb-5 font-sans text-[0.78rem] leading-relaxed text-muted-foreground">
            You added <span className="text-foreground">Signature Manicure</span>. Choose how it should sit next to your
            facial.
          </p>
          <div className="grid gap-4 @2xl:grid-cols-2">
            {schedulingOptions.map((option) => (
              <Surface key={option.id} active={option.recommended} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <ScreenTitle theme={theme} as="h4" className="text-base">
                      {option.title}
                    </ScreenTitle>
                    <span className="mt-1 block font-sans text-[0.7rem] font-medium text-accent">{option.timing}</span>
                  </div>
                  {option.recommended && <Tag>Recommended</Tag>}
                </div>
                <p className="mt-3 font-sans text-[0.74rem] leading-relaxed text-muted-foreground">
                  {option.explanation}
                </p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {option.points.map((point) => (
                    <Bullet key={point}>{point}</Bullet>
                  ))}
                </ul>
                {/* mini visual of the two arrangements */}
                <div className="mt-5 border-t border-border pt-4">
                  <Label theme={theme}>How your day looks</Label>
                  {option.id === "back-to-back" ? (
                    <div className="mt-2.5 flex items-center gap-1">
                      <span className="h-6 flex-[3] rounded-[var(--radius)] bg-primary/85" aria-hidden />
                      <span className="h-6 flex-[2.5] rounded-[var(--radius)] bg-accent/70" aria-hidden />
                      <span className="ml-2 shrink-0 font-mono text-[0.6rem] text-muted-foreground">1 visit</span>
                    </div>
                  ) : (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-4 flex-[3] rounded-[var(--radius)] bg-primary/85" aria-hidden />
                        <span className="shrink-0 font-mono text-[0.6rem] text-muted-foreground">12 Mar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-4 flex-[2.5] rounded-[var(--radius)] bg-accent/70" aria-hidden />
                        <span className="shrink-0 font-mono text-[0.6rem] text-muted-foreground">19 Mar</span>
                      </div>
                    </div>
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
          <Shell theme={theme} step={7} title="Review your booking" cartCount={2} action={<Btn>Confirm booking</Btn>}>
            <div className="grid gap-6 @2xl:grid-cols-[1fr_250px]">
              <div className="flex flex-col gap-5">
                <Surface muted className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <Label theme={theme}>Date</Label>
                    <span className="mt-0.5 block font-serif text-base text-foreground">{draftBooking.date}</span>
                  </div>
                  <div className="text-right">
                    <Label theme={theme}>In the salon</Label>
                    <span className="mt-0.5 block font-serif text-base text-foreground">{draftBooking.window}</span>
                  </div>
                </Surface>
                <div>
                  <Label theme={theme}>Treatments · who and when</Label>
                  <div className="mt-2.5 divide-y divide-border border-y border-border">
                    {draftBooking.items.map((item, index) => {
                      const person = people[item.specialistIndex]
                      return (
                        <div key={item.treatmentId} className="flex flex-col gap-2 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.58rem] font-semibold text-primary-foreground">
                              {index + 1}
                            </span>
                            <span className="min-w-0 flex-1 truncate font-sans text-[0.82rem] font-medium text-foreground">
                              {item.name}
                            </span>
                            <Money className="shrink-0 text-[0.85rem]">{item.price}</Money>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pl-8">
                            <TimeRange from={item.from} to={item.to} />
                            <Duration>{item.duration}</Duration>
                            <span className="flex items-center gap-2">
                              <Avatar src={person.image} alt={person.name} size={22} />
                              <span className="font-sans text-[0.7rem] text-muted-foreground">
                                {person.name} · {person.role}
                              </span>
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Surface className="p-4">
                  <Label theme={theme}>Arrangement</Label>
                  <p className="mt-2 font-sans text-[0.74rem] leading-relaxed text-muted-foreground">
                    Back-to-back — your manicure begins the moment the facial finishes. One arrival, one departure.
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="h-5 flex-[3] rounded-[var(--radius)] bg-primary/85" aria-hidden />
                    <span className="h-5 flex-[2.5] rounded-[var(--radius)] bg-accent/70" aria-hidden />
                  </div>
                  <div className="mt-1.5 flex justify-between font-mono text-[0.58rem] text-muted-foreground">
                    <span>14:30</span>
                    <span>16:00</span>
                    <span>17:15</span>
                  </div>
                </Surface>
              </div>
              <div className="flex flex-col gap-4">
                <Surface className="p-4">
                  <Label theme={theme}>Payment</Label>
                  <div className="mt-3 flex flex-col gap-2">
                    {[
                      ["Treatments (2)", draftBooking.total],
                      ["Total time", draftBooking.totalDuration],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between font-sans text-[0.72rem]">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                    <Label theme={theme}>Due</Label>
                    <Money className="text-xl">{draftBooking.total}</Money>
                  </div>
                </Surface>
                <Surface muted className="p-4">
                  <ul className="flex flex-col gap-1.5">
                    <Bullet>Free cancellation up to 24 h before</Bullet>
                    <Bullet>Pay in the salon</Bullet>
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
