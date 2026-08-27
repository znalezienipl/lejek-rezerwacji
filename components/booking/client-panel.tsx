import { ArrowRight, CalendarDays, CalendarPlus, Gift, Plus, RotateCcw, Sparkles, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import {
  Avatar,
  Btn,
  Bullet,
  DateBlock,
  Duration,
  Field,
  Label,
  Money,
  ProgressTrack,
  ScreenTitle,
  SpecialistRow,
  StampGrid,
  StatusPill,
  Surface,
  Tabs,
  Tag,
  TimeRange,
  type VariantDef,
} from "./shared"
import { specialistsByTheme } from "@/lib/booking-data"
import type { PAppointment } from "@/lib/client-panel-data"
import {
  cancelPolicy,
  clientProfile,
  emptyState,
  loyalty,
  packages,
  panelTabs,
  pastAppointments,
  rescheduleSuggestions,
  upcomingAppointments,
} from "@/lib/client-panel-data"

/* ------------------------------------------------------------------ */
/* Client panel — the counterpart to the "Split Panel" booking flow.   */
/* Same rail + main-panel skeleton, same cards, same price/time voice. */
/* ------------------------------------------------------------------ */

const panelNav = [
  { id: "visits", label: "My visits", icon: CalendarDays },
  { id: "packages", label: "Packages & loyalty", icon: Gift },
  { id: "details", label: "Your details", icon: User },
]

/** Client identity block — mirrors the booking rail's header rhythm. */
function Identity({ theme, compact, empty }: { theme: ThemeId; compact?: boolean; empty?: boolean }) {
  const caption = empty ? "New client" : compact ? `${clientProfile.visits} visits` : clientProfile.since
  return (
    <div className={cn("flex items-center gap-3", compact && "min-w-0")}>
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-serif text-[0.78rem] text-accent"
      >
        {empty ? "ZK" : clientProfile.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-sans text-[0.78rem] font-medium text-foreground">
          {empty ? "Zofia Krupa" : clientProfile.name}
        </span>
        <span className="block truncate font-sans text-[0.62rem] text-muted-foreground">{caption}</span>
      </span>
    </div>
  )
}

function PanelShell({
  theme,
  nav,
  title,
  eyebrow,
  children,
  action,
  empty,
}: {
  theme: ThemeId
  nav: string
  title: string
  eyebrow: string
  children: React.ReactNode
  action?: React.ReactNode
  /** New client with no history — the rail has nothing to summarise yet. */
  empty?: boolean
}) {
  return (
    <div className="flex min-h-[560px] flex-col bg-background @2xl:grid @2xl:grid-cols-[236px_1fr] @2xl:items-start">
      {/* ---------- left rail: desktop ---------- */}
      <aside className="hidden h-full flex-col gap-6 border-r border-border bg-card p-6 @2xl:flex">
        <div>
          <Label theme={theme}>Your account</Label>
          <div className="mt-3">
            <Identity theme={theme} empty={empty} />
          </div>
        </div>
        <nav className="flex flex-col gap-0.5">
          {panelNav.map((item) => {
            const active = item.id === nav
            return (
              <span
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius)] px-2.5 py-2 font-sans text-[0.72rem]",
                  active ? "bg-secondary/60 font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className={cn("size-3.5 shrink-0", active ? "text-accent" : "")} aria-hidden />
                {item.label}
              </span>
            )
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <Surface muted className="p-3">
            <Label theme={theme}>{empty ? "No visit booked" : "Next visit"}</Label>
            <span className="mt-1.5 block font-sans text-[0.72rem] font-medium text-foreground">
              {empty
                ? "Your first appointment will show here"
                : `${upcomingAppointments[0].dateShort} · ${upcomingAppointments[0].window}`}
            </span>
          </Surface>
          <Btn full>
            <Plus className="size-3.5" aria-hidden />
            Book a visit
          </Btn>
        </div>
      </aside>

      {/* ---------- mobile: identity bar + quick book ---------- */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 @2xl:hidden">
        <Identity theme={theme} compact empty={empty} />
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius)] bg-primary px-3 py-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em] text-primary-foreground",
          )}
        >
          <Plus className="size-3" aria-hidden />
          Book
        </span>
      </div>

      {/* ---------- main panel ---------- */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 @2xl:px-8 @2xl:py-5">
          <div className="min-w-0">
            <Label theme={theme}>{eyebrow}</Label>
            <ScreenTitle theme={theme} className="mt-0.5 truncate text-lg @2xl:text-xl">
              {title}
            </ScreenTitle>
          </div>
          {action && <div className="hidden shrink-0 @2xl:block">{action}</div>}
        </div>
        <div className="flex-1 px-5 py-5 @2xl:px-8 @2xl:py-7">{children}</div>
        {action && <div className="border-t border-border px-5 py-4 @2xl:hidden">{action}</div>}
      </main>
    </div>
  )
}

/**
 * A visit card. Two treatments are shown as separate lines with a price each
 * and a total at the bottom — exactly like the booking summary screen.
 */
function VisitCard({
  theme,
  visit,
  variant = "upcoming",
}: {
  theme: ThemeId
  visit: PAppointment
  variant?: "upcoming" | "past"
}) {
  const people = specialistsByTheme[theme]
  const dimmed = variant === "past"
  const cancelled = visit.status === "cancelled"
  return (
    <Surface className={cn("p-4", cancelled && "opacity-70")}>
      <div className="flex items-start gap-3">
        <DateBlock weekday={visit.weekday} date={visit.dateShort} theme={theme} dimmed={dimmed} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={visit.status} theme={theme} />
            {visit.items.length > 1 && <Tag>{visit.items.length} treatments</Tag>}
          </div>
          <span className="mt-1.5 block font-sans text-[0.72rem] text-muted-foreground">{visit.date}</span>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <TimeRange from={visit.window.split(" – ")[0]} to={visit.window.split(" – ")[1]} />
            <Duration>{visit.totalDuration}</Duration>
          </div>
        </div>
      </div>

      {/* treatment lines — one section per treatment, price on each */}
      <div className="mt-4 flex flex-col divide-y divide-border border-y border-border">
        {visit.items.map((item) => (
          <div key={item.name} className="flex items-start justify-between gap-3 py-3">
            <div className="min-w-0">
              <span className="block font-sans text-[0.78rem] font-medium leading-snug text-foreground">
                {item.name}
              </span>
              <div className="mt-1.5 flex items-center gap-2">
                <Avatar src={people[item.specialistIndex].image} alt={people[item.specialistIndex].name} size={20} />
                <span className="truncate font-sans text-[0.65rem] text-muted-foreground">
                  {people[item.specialistIndex].name}
                </span>
              </div>
              <TimeRange from={item.from} to={item.to} className="mt-1.5 text-[0.7rem]" />
            </div>
            <Money className="shrink-0 text-[0.85rem]">{item.price}</Money>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3">
        <Label theme={theme}>Total</Label>
        <Money>{cancelled ? "Not charged" : visit.total}</Money>
      </div>

      {/* actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {variant === "upcoming" ? (
          <>
            <Btn variant="outline" className="px-4 py-2.5 text-[0.62rem]">
              <RotateCcw className="size-3" aria-hidden />
              Reschedule
            </Btn>
            <Btn variant="ghost" className="px-4 py-2.5 text-[0.62rem]">
              <X className="size-3" aria-hidden />
              Cancel
            </Btn>
          </>
        ) : (
          <Btn variant="outline" className="px-4 py-2.5 text-[0.62rem]">
            <RotateCcw className="size-3" aria-hidden />
            Book again
          </Btn>
        )}
      </div>
    </Surface>
  )
}

function PackageCard({ theme, pkg }: { theme: ThemeId; pkg: (typeof packages)[number] }) {
  return (
    <Surface className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <ScreenTitle theme={theme} as="h4" className="text-[0.95rem]">
            {pkg.name}
          </ScreenTitle>
          <span className="mt-0.5 block font-sans text-[0.68rem] text-muted-foreground">{pkg.caption}</span>
        </div>
        <Tag>{pkg.saved}</Tag>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-serif text-2xl leading-none text-foreground">
            {pkg.used}
            <span className="font-sans text-[0.8rem] text-muted-foreground"> of {pkg.total} used</span>
          </span>
          <span className="font-sans text-[0.68rem] text-accent">{pkg.total - pkg.used} left</span>
        </div>
        <div className="mt-2.5">
          <ProgressTrack used={pkg.used} total={pkg.total} theme={theme} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border pt-3">
        <span className="font-sans text-[0.66rem] text-muted-foreground">{pkg.validUntil}</span>
        <span className="font-sans text-[0.66rem] text-foreground">{pkg.perVisit}</span>
      </div>
    </Surface>
  )
}

export const clientPanelDef: VariantDef = {
  id: "panel",
  name: "Client Panel",
  approach: "Mobile-first account area · reached from an email or SMS link",
  description:
    "Where the client lands after booking. It reuses the Split Panel skeleton — a rail that always shows who she is and when her next visit is, plus a main panel of scannable cards. Upcoming and past visits are split by tabs, packages are shown as segmented progress tracks and loyalty as collectable stamps.",
  screens: [
    /* 1 — panel home, upcoming visits */
    {
      title: "Panel home · upcoming visits",
      render: (theme) => (
        <PanelShell
          theme={theme}
          nav="visits"
          eyebrow="My visits"
          title="Upcoming visits"
          action={
            <Btn full>
              <Plus className="size-3.5" aria-hidden />
              Book another visit
            </Btn>
          }
        >
          <div className="flex flex-col gap-5">
            <Tabs theme={theme} items={panelTabs} activeId="upcoming" />
            <div className="flex flex-col gap-4 @3xl:grid @3xl:grid-cols-2 @3xl:items-start">
              {upcomingAppointments.map((visit) => (
                <VisitCard key={visit.id} theme={theme} visit={visit} />
              ))}
            </div>
            {/* packages teaser keeps the home screen useful */}
            <Surface muted className="p-4">
              <div className="flex items-center justify-between gap-3">
                <Label theme={theme}>Facial Ritual Package</Label>
                <span className="font-sans text-[0.68rem] text-accent">
                  {packages[0].total - packages[0].used} left
                </span>
              </div>
              <div className="mt-2.5">
                <ProgressTrack used={packages[0].used} total={packages[0].total} theme={theme} size="sm" />
              </div>
            </Surface>
          </div>
        </PanelShell>
      ),
    },

    /* 2 — visit details */
    {
      title: "Visit details",
      render: (theme) => {
        const visit = upcomingAppointments[0]
        const people = specialistsByTheme[theme]
        return (
          <PanelShell
            theme={theme}
            nav="visits"
            eyebrow="Visit on 12 March"
            title="One visit, two treatments"
            action={
              <Btn variant="outline" full>
                <CalendarPlus className="size-3.5" aria-hidden />
                Add to calendar
              </Btn>
            }
          >
            <div className="flex flex-col gap-5 @3xl:grid @3xl:grid-cols-[1.2fr_0.8fr] @3xl:items-start @3xl:gap-8">
              <div className="flex flex-col gap-4">
                <Surface className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StatusPill status={visit.status} theme={theme} />
                    <span className="font-sans text-[0.68rem] text-muted-foreground">
                      Arrive 10 min early
                    </span>
                  </div>
                  <ScreenTitle theme={theme} as="h4" className="mt-3 text-lg">
                    {visit.date}
                  </ScreenTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <TimeRange
                      from={visit.window.split(" – ")[0]}
                      to={visit.window.split(" – ")[1]}
                      className="text-[0.95rem]"
                    />
                    <Duration>{visit.totalDuration}</Duration>
                  </div>
                </Surface>

                {/* one section per treatment */}
                {visit.items.map((item, index) => (
                  <Surface key={item.name} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Label theme={theme}>Treatment {index + 1}</Label>
                      <Money className="text-[0.9rem]">{item.price}</Money>
                    </div>
                    <ScreenTitle theme={theme} as="h4" className="mt-2 text-[1rem]">
                      {item.name}
                    </ScreenTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <TimeRange from={item.from} to={item.to} />
                      <Duration>{item.duration}</Duration>
                    </div>
                    <div className="mt-3 border-t border-border pt-3">
                      <SpecialistRow
                        name={people[item.specialistIndex].name}
                        role={people[item.specialistIndex].role}
                        image={people[item.specialistIndex].image}
                        rating={people[item.specialistIndex].rating}
                      />
                    </div>
                  </Surface>
                ))}

                <Surface muted className="flex items-center justify-between p-4">
                  <Label theme={theme}>Total</Label>
                  <Money className="text-lg">{visit.total}</Money>
                </Surface>
              </div>

              {/* side column: manage */}
              <div className="flex flex-col gap-4">
                <Surface className="p-4">
                  <Label theme={theme}>Manage this visit</Label>
                  <div className="mt-3 flex flex-col gap-2">
                    <Btn variant="outline" full>
                      <RotateCcw className="size-3.5" aria-hidden />
                      Reschedule
                    </Btn>
                    <Btn variant="ghost" full>
                      <X className="size-3.5" aria-hidden />
                      Cancel visit
                    </Btn>
                  </div>
                  <p className="mt-3 border-t border-border pt-3 font-sans text-[0.66rem] leading-relaxed text-muted-foreground">
                    {cancelPolicy.headline}
                  </p>
                </Surface>
                <Surface muted className="p-4">
                  <Label theme={theme}>Your note on file</Label>
                  <p className="mt-2 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
                    {clientProfile.notes}
                  </p>
                </Surface>
              </div>
            </div>
          </PanelShell>
        )
      },
    },

    /* 3 — cancel or reschedule */
    {
      title: "Cancel or reschedule",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        return (
          <PanelShell
            theme={theme}
            nav="visits"
            eyebrow="Visit on 12 March"
            title="Change or cancel"
            action={
              <Btn full>
                Confirm new time
                <ArrowRight className="size-3.5" aria-hidden />
              </Btn>
            }
          >
            <div className="flex flex-col gap-5 @3xl:grid @3xl:grid-cols-2 @3xl:items-start @3xl:gap-8">
              {/* reschedule */}
              <div className="flex flex-col gap-3">
                <div>
                  <ScreenTitle theme={theme} as="h4" className="text-[1rem]">
                    Move to another time
                  </ScreenTitle>
                  <p className="mt-1 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
                    Nearest slots that fit both treatments back-to-back.
                  </p>
                </div>
                {rescheduleSuggestions.map((slot, index) => (
                  <Surface key={slot.date} active={index === 0} className="flex items-center gap-3 p-3.5">
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border",
                        index === 0 ? "border-accent" : "border-border",
                      )}
                    >
                      {index === 0 && <span className="size-2 rounded-full bg-accent" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-sans text-[0.74rem] font-medium text-foreground">
                        {slot.date}
                      </span>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <TimeRange from={slot.from} to={slot.to} className="text-[0.7rem]" />
                        <span className="font-sans text-[0.64rem] text-muted-foreground">{slot.note}</span>
                      </div>
                    </div>
                    <Avatar
                      src={people[slot.specialistIndex].image}
                      alt={people[slot.specialistIndex].name}
                      size={26}
                    />
                  </Surface>
                ))}
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                  Pick a different date
                </span>
              </div>

              {/* cancel */}
              <Surface muted className="p-4">
                <Label theme={theme}>Or cancel completely</Label>
                <ScreenTitle theme={theme} as="h4" className="mt-2 text-[1rem]">
                  {cancelPolicy.headline}
                </ScreenTitle>
                <ul className="mt-3 flex flex-col gap-2">
                  {cancelPolicy.points.map((point) => (
                    <Bullet key={point}>{point}</Bullet>
                  ))}
                </ul>
                <div className="mt-4 border-t border-border pt-4">
                  <Btn variant="outline" full>
                    <X className="size-3.5" aria-hidden />
                    Cancel this visit
                  </Btn>
                </div>
              </Surface>
            </div>
          </PanelShell>
        )
      },
    },

    /* 4 — past visits */
    {
      title: "Past visits history",
      render: (theme) => (
        <PanelShell
          theme={theme}
          nav="visits"
          eyebrow="My visits"
          title="Past visits"
          action={
            <Btn full>
              <Plus className="size-3.5" aria-hidden />
              Book a visit
            </Btn>
          }
        >
          <div className="flex flex-col gap-5">
            <Tabs theme={theme} items={panelTabs} activeId="past" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
              {[
                ["Visits so far", String(clientProfile.visits)],
                ["Client since", "June 2024"],
                ["Favourite", "Signature Glow Facial"],
              ].map(([k, v]) => (
                <div key={k}>
                  <Label theme={theme}>{k}</Label>
                  <span className="mt-0.5 block font-sans text-[0.76rem] text-foreground">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 @3xl:grid @3xl:grid-cols-2 @3xl:items-start">
              {pastAppointments.map((visit) => (
                <VisitCard key={visit.id} theme={theme} visit={visit} variant="past" />
              ))}
            </div>
          </div>
        </PanelShell>
      ),
    },

    /* 5 — packages & loyalty */
    {
      title: "Packages & loyalty",
      render: (theme) => (
        <PanelShell
          theme={theme}
          nav="packages"
          eyebrow="Packages & loyalty"
          title="Your packages"
          action={
            <Btn full>
              Use a package visit
              <ArrowRight className="size-3.5" aria-hidden />
            </Btn>
          }
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 @3xl:grid @3xl:grid-cols-2 @3xl:items-start">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} theme={theme} pkg={pkg} />
              ))}
            </div>

            {/* loyalty stamps */}
            <Surface className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <ScreenTitle theme={theme} as="h4" className="text-[0.95rem]">
                    {loyalty.title}
                  </ScreenTitle>
                  <span className="mt-0.5 block font-sans text-[0.68rem] text-muted-foreground">
                    {loyalty.caption}
                  </span>
                </div>
                <Tag>{loyalty.note}</Tag>
              </div>
              <div className="mt-4">
                <StampGrid collected={loyalty.collected} total={loyalty.total} theme={theme} />
              </div>
              <div className="mt-4 flex items-start gap-2.5 border-t border-border pt-3">
                <Gift className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                <span className="font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
                  {loyalty.reward}
                </span>
              </div>
            </Surface>
          </div>
        </PanelShell>
      ),
    },

    /* 6 — your details */
    {
      title: "Your details",
      render: (theme) => {
        const people = specialistsByTheme[theme]
        return (
          <PanelShell
            theme={theme}
            nav="details"
            eyebrow="Your details"
            title="Contact information"
            action={
              <Btn full>
                Save changes
                <ArrowRight className="size-3.5" aria-hidden />
              </Btn>
            }
          >
            <div className="flex flex-col gap-5 @3xl:grid @3xl:grid-cols-[1.1fr_0.9fr] @3xl:items-start @3xl:gap-8">
              <Surface className="px-4 py-1">
                <div className="flex flex-col divide-y divide-border">
                  <Field theme={theme} label="Full name" value={clientProfile.name} />
                  <Field
                    theme={theme}
                    label="Email"
                    value={clientProfile.email}
                    hint="Confirmations and reminders are sent here"
                  />
                  <Field theme={theme} label="Phone" value={clientProfile.phone} hint="Used for SMS reminders" />
                  <Field theme={theme} label="Birthday" value={clientProfile.birthday} hint="For your birthday treat" />
                </div>
              </Surface>

              <div className="flex flex-col gap-4">
                <Surface className="p-4">
                  <Label theme={theme}>Preferred specialist</Label>
                  <div className="mt-3">
                    <SpecialistRow
                      name={people[clientProfile.preferredSpecialistIndex].name}
                      role={people[clientProfile.preferredSpecialistIndex].role}
                      image={people[clientProfile.preferredSpecialistIndex].image}
                      rating={people[clientProfile.preferredSpecialistIndex].rating}
                    />
                  </div>
                  <p className="mt-3 border-t border-border pt-3 font-sans text-[0.66rem] text-muted-foreground">
                    We will offer her slots first when you book.
                  </p>
                </Surface>
                <Surface muted className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Label theme={theme}>Notes for your specialist</Label>
                    <span className="shrink-0 font-sans text-[0.64rem] uppercase tracking-[0.12em] text-accent">
                      Edit
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
                    {clientProfile.notes}
                  </p>
                </Surface>
              </div>
            </div>
          </PanelShell>
        )
      },
    },

    /* 7 — empty state */
    {
      title: "Empty state · new client",
      render: (theme) => (
        <PanelShell
          theme={theme}
          nav="visits"
          eyebrow="My visits"
          title="Welcome"
          empty
          action={
            <Btn full>
              <Plus className="size-3.5" aria-hidden />
              {emptyState.primary}
            </Btn>
          }
        >
          <div className="flex flex-col gap-5">
            <Tabs theme={theme} items={[{ id: "upcoming", label: "Upcoming", count: 0 }, { id: "past", label: "Past", count: 0 }]} activeId="upcoming" />

            <Surface className="flex flex-col items-center px-6 py-10 text-center">
              <span
                aria-hidden
                className={cn(
                  "flex size-14 items-center justify-center border border-accent/40 bg-accent/10",
                  theme === "wellness" ? "rounded-full" : "rounded-[var(--radius)]",
                )}
              >
                <Sparkles className="size-6 text-accent" />
              </span>
              <ScreenTitle theme={theme} as="h4" className="mt-5 text-xl">
                {emptyState.title}
              </ScreenTitle>
              <p className="mt-2.5 max-w-[42ch] font-sans text-[0.76rem] leading-relaxed text-muted-foreground">
                {emptyState.body}
              </p>
              <div className="mt-6 flex flex-col gap-2.5 @sm:flex-row">
                <Btn>
                  <Plus className="size-3.5" aria-hidden />
                  {emptyState.primary}
                </Btn>
                <Btn variant="outline">{emptyState.secondary}</Btn>
              </div>
              <ul className="mt-8 flex flex-col gap-2 border-t border-border pt-5 text-left">
                {emptyState.hints.map((hint) => (
                  <Bullet key={hint}>{hint}</Bullet>
                ))}
              </ul>
            </Surface>

            {/* dormant package/loyalty placeholders so the layout is not bare */}
            <div className="flex flex-col gap-4 @3xl:grid @3xl:grid-cols-2 @3xl:items-start">
              <Surface muted className="p-4">
                <Label theme={theme}>Packages</Label>
                <span className="mt-2 block font-sans text-[0.72rem] text-muted-foreground">
                  No active package yet — buying one saves up to 20%.
                </span>
                <div className="mt-3">
                  <ProgressTrack used={0} total={5} theme={theme} size="sm" />
                </div>
              </Surface>
              <Surface muted className="p-4">
                <Label theme={theme}>Loyalty card</Label>
                <span className="mt-2 block font-sans text-[0.72rem] text-muted-foreground">
                  Your first stamp arrives after your first visit.
                </span>
                <div className="mt-3">
                  <StampGrid collected={0} total={10} theme={theme} />
                </div>
              </Surface>
            </div>
          </div>
        </PanelShell>
      ),
    },
  ],
}
