import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import { Btn, Label, Money, Tag, type VariantDef } from "./shared"
import { Shell } from "./variant-split"

/**
 * Step 2 of the booking funnel — the moment the client chooses HOW to buy the
 * treatment she just picked. Single visit is the default; the package sits
 * beside it as an option, never instead of it.
 *
 * Content is hardcoded (a static mock), and every visual reads the world's
 * shadcn tokens through the shared primitives, so it themes across all worlds
 * with no per-world code.
 */

const treatmentName = "Masaż twarzy Kobido"
const packageInterval = "zalecany odstęp 4 tygodnie"

/** Length variants of the single visit. First one is the default selection. */
const singleVariants = [
  { id: "kobido-60", label: "Wersja klasyczna", sub: "60 minut", price: "180 zł" },
  { id: "kobido-90", label: "Wersja rozszerzona", sub: "90 minut", price: "250 zł" },
]

/** Packages — same treatment bought as a series. Savings shown in złotówki. */
const packageOptions = [
  { id: "kobido-4", label: "Pakiet 4 wizyt", per: "165 zł za zabieg", total: "660 zł", save: "60 zł", validity: "ważny 90 dni" },
  { id: "kobido-6", label: "Pakiet 6 wizyt", per: "150 zł za zabieg", total: "900 zł", save: "180 zł", validity: "ważny 90 dni" },
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

        {/* single visit — the plain default */}
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

        {/* packages — same treatment, bought as a series */}
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

export const packageSelectDef: VariantDef = {
  id: "package-select",
  name: "Wybór pakietu",
  approach: "Krok 2 · pojedyncza wizyta i pakiet obok siebie",
  description:
    "Krok drugi lejka: po wyborze zabiegu klientka decyduje, jak go kupić. Pojedyncza wizyta jest zaznaczona domyślnie, a pakiet stoi obok jako opcja — z ceną całości, ceną za zabieg, oszczędnością w złotówkach i ważnością. Terminy umawia się od razu, płatność jest w salonie. Cały ekran żyje w tym samym chrome lejka i tych samych prymitywach, więc themuje się we wszystkich światach bez osobnego kodu.",
  screens: [
    { title: "Pojedyncza wizyta (domyślnie)", render: (theme) => <PackageScreen theme={theme} selected="kobido-60" /> },
    { title: "Pakiet zaznaczony", render: (theme) => <PackageScreen theme={theme} selected="kobido-4" /> },
  ],
}
