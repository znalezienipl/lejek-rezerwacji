import { ArrowRight, Bell, Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/tokens/design-tokens"
import {
  Btn,
  CheckBox,
  Duration,
  Label,
  Money,
  ScreenTitle,
  Surface,
  TimeRange,
  Toggle,
  type VariantDef,
} from "./shared"
import { themeMeta } from "./registry"

/* ------------------------------------------------------------------ */
/* Consent layer                                                       */
/* Two asks that must never be bundled:                                */
/*  (1) messages about MY booked visit — part of the service, no ask   */
/*  (2) "let me know when it's time again" — optional, default OFF      */
/* Copy is Polish, plain-spoken, no legal jargon.                      */
/* ------------------------------------------------------------------ */

/** One opt-in row: title + one grey line of plain explanation + switch. */
function ToggleRow({
  theme,
  title,
  explanation,
  on,
}: {
  theme: ThemeId
  title: string
  explanation: string
  on: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <span className="block font-sans text-[0.82rem] font-medium leading-snug text-foreground text-pretty">
          {title}
        </span>
        <span className="mt-1 block font-sans text-[0.7rem] leading-relaxed text-muted-foreground text-pretty">
          {explanation}
        </span>
      </div>
      <Toggle on={on} theme={theme} />
    </div>
  )
}

/**
 * Screen A — the "Twoje dane" panel screen, focused on its last section.
 * A couple of real contact rows set the context, then "Kontakt z salonem".
 * No Save button: changes are saved instantly.
 */
function DataScreen({ theme, reminderOn }: { theme: ThemeId; reminderOn: boolean }) {
  return (
    <div className="flex min-h-[600px] flex-col bg-background">
      {/* screen header */}
      <div className="border-b border-border px-5 py-4 @2xl:px-8 @2xl:py-5">
        <Label theme={theme}>Twój panel</Label>
        <ScreenTitle theme={theme} className="mt-0.5 text-lg @2xl:text-xl">
          Twoje dane
        </ScreenTitle>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-5 py-6 @2xl:px-8">
        {/* brief contact context so the screen reads as the real one */}
        <Surface className="px-4">
          <div className="flex flex-col divide-y divide-border">
            {[
              ["Imię i nazwisko", "Zofia Krupa"],
              ["E-mail", "zofia.krupa@email.pl"],
              ["Telefon", "+48 601 234 567"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <Label theme={theme}>{k}</Label>
                  <span className="mt-0.5 block truncate font-sans text-[0.8rem] text-foreground">{v}</span>
                </div>
                <span className="shrink-0 font-sans text-[0.64rem] uppercase tracking-[0.12em] text-accent">
                  Zmień
                </span>
              </div>
            ))}
          </div>
        </Surface>

        {/* --- the consent section: last on the screen --- */}
        <section className="mt-auto">
          <div className="flex items-center gap-2.5">
            <Bell className="size-3.5 text-accent" aria-hidden />
            <Label theme={theme}>Kontakt z salonem</Label>
          </div>

          <Surface className="mt-3 px-4">
            <div className="flex flex-col divide-y divide-border">
              <ToggleRow
                theme={theme}
                title="Powiadomienia o moich wizytach"
                explanation="Potwierdzenie rezerwacji i przypomnienie o umówionym terminie."
                on
              />
              <ToggleRow
                theme={theme}
                title="Przypomnienie, gdy przyjdzie pora na kolejną wizytę"
                explanation="Odezwiemy się, gdy minie trochę czasu od ostatniej wizyty. Bez presji."
                on={reminderOn}
              />
            </div>
          </Surface>

          <p className="mt-3 font-sans text-[0.66rem] text-muted-foreground">Ustawienia zmienione 14 marca.</p>
        </section>
      </div>
    </div>
  )
}

/**
 * Screen B — booking step 07 summary. The optional opt-in sits under the
 * recap and ABOVE the confirm button, unchecked. It never blocks the button;
 * messages about the visit itself are not offered here — they are part of
 * the booking.
 */
function SummaryScreen({ theme }: { theme: ThemeId }) {
  const treatments = [
    { name: "Rytuał Rozświetlający — twarz", from: "14:30", to: "16:00", duration: "90 min", price: "420 zł" },
    { name: "Manicure Signature", from: "16:00", to: "17:15", duration: "75 min", price: "260 zł" },
  ]
  return (
    <div className="flex min-h-[600px] flex-col bg-background">
      <div className="border-b border-border px-5 py-4 @2xl:px-8 @2xl:py-5">
        <Label theme={theme}>Krok 07 · Podsumowanie</Label>
        <ScreenTitle theme={theme} className="mt-0.5 text-lg @2xl:text-xl">
          Sprawdź swoją rezerwację
        </ScreenTitle>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 @2xl:px-8">
        <div className="flex flex-col gap-5">
          {/* date + salon time */}
          <Surface muted className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Label theme={theme}>Termin</Label>
              <span className="mt-0.5 block font-serif text-base text-foreground">wtorek, 12 marca</span>
            </div>
            <div className="text-right">
              <Label theme={theme}>W salonie</Label>
              <span className="mt-0.5 block font-serif text-base text-foreground">14:30 – 17:15</span>
            </div>
          </Surface>

          {/* treatments */}
          <div>
            <Label theme={theme}>Zabiegi</Label>
            <div className="mt-2.5 divide-y divide-border border-y border-border">
              {treatments.map((item, index) => (
                <div key={item.name} className="flex flex-col gap-2 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-[0.58rem] font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-sans text-[0.82rem] font-medium text-foreground">
                      {item.name}
                    </span>
                    <Money className="shrink-0 text-[0.85rem]">{item.price}</Money>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-8">
                    <TimeRange from={item.from} to={item.to} />
                    <Duration>{item.duration}</Duration>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* total */}
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <Label theme={theme}>Razem</Label>
            <Money className="text-xl">680 zł</Money>
          </div>
        </div>

        {/* --- optional opt-in, unchecked, above the button --- */}
        <div className="mt-6">
          <label className="flex items-start gap-3">
            <CheckBox checked={false} theme={theme} />
            <span className="min-w-0">
              <span className="block font-sans text-[0.8rem] leading-snug text-foreground text-pretty">
                Dajcie mi znać, gdy przyjdzie pora na kolejną wizytę
              </span>
              <span className="mt-1 block font-sans text-[0.68rem] text-muted-foreground">
                Możesz to wyłączyć w swoim panelu.
              </span>
            </span>
          </label>
        </div>

        {/* confirm — works whether or not the box is ticked */}
        <div className="mt-6 pt-2">
          <Btn full>
            Potwierdź rezerwację
            <ArrowRight className="size-3.5" aria-hidden />
          </Btn>
        </div>
      </div>
    </div>
  )
}

/**
 * Screen C — the standalone salon link. No login, no form, no nav, no footer.
 * Just the salon name, one question and two equally weighted answers.
 */
function ChoiceButton({ children, theme }: { children: React.ReactNode; theme: ThemeId }) {
  void theme
  return (
    <span className="inline-flex w-full items-center justify-center rounded-[var(--radius)] border border-foreground/30 bg-card px-6 py-4 text-center font-sans text-[0.82rem] font-medium text-foreground">
      {children}
    </span>
  )
}

function LinkAskScreen({ theme }: { theme: ThemeId }) {
  const brand = themeMeta[theme].brand
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center bg-background px-7 py-12 text-center">
      <span className="font-serif text-[0.9rem] uppercase tracking-[0.3em] text-accent">{brand}</span>

      <ScreenTitle theme={theme} className="mt-10 max-w-[22ch] text-2xl leading-snug @2xl:text-3xl">
        Czy salon {brand} może dać Ci znać, gdy przyjdzie pora na kolejną wizytę?
      </ScreenTitle>

      <div className="mt-10 flex w-full max-w-[380px] flex-col gap-3 @2xl:flex-row">
        <ChoiceButton theme={theme}>Tak, dajcie znać</ChoiceButton>
        <ChoiceButton theme={theme}>Nie, dziękuję</ChoiceButton>
      </div>

      <p className="mt-6 font-sans text-[0.7rem] text-muted-foreground">Zawsze możesz to zmienić.</p>
    </div>
  )
}

/** Shared confirmation frame for both answers — identical warmth and weight. */
function ConfirmationScreen({
  theme,
  headline,
  sub,
}: {
  theme: ThemeId
  headline: string
  sub: string
}) {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center bg-background px-7 py-12 text-center">
      <span
        aria-hidden
        className={cn(
          "flex size-14 items-center justify-center border border-accent/40 bg-accent/10",
          theme === "wellness" ? "rounded-full" : "rounded-[var(--radius)]",
        )}
      >
        <Check className="size-6 text-accent" />
      </span>

      <ScreenTitle theme={theme} className="mt-6 max-w-[24ch] text-xl leading-snug @2xl:text-2xl">
        {headline}
      </ScreenTitle>

      <p className="mt-3 max-w-[34ch] font-sans text-[0.76rem] leading-relaxed text-muted-foreground text-pretty">
        {sub}
      </p>

      <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-[0.66rem] text-muted-foreground">
        <Clock className="size-3" aria-hidden />
        Możesz zamknąć tę stronę.
      </span>
    </div>
  )
}

export const consentLayerDef: VariantDef = {
  id: "consent",
  name: "Consent Layer",
  approach: "Two asks, never bundled · the optional one is off by default",
  description:
    "Messages about a booked visit are part of the service and are never presented as a choice. The one genuine opt-in — 'let me know when it's time again' — is separate, plain-spoken and off by default. It appears in the panel, once in the booking summary, and on a no-login salon link, where 'No thank you' looks exactly as normal as 'Yes'.",
  screens: [
    {
      title: "Twoje dane · oba włączone",
      render: (theme) => <DataScreen theme={theme} reminderOn />,
    },
    {
      title: "Twoje dane · przypomnienie wyłączone (domyślnie)",
      render: (theme) => <DataScreen theme={theme} reminderOn={false} />,
    },
    {
      title: "Rezerwacja · krok 07",
      render: (theme) => <SummaryScreen theme={theme} />,
    },
    {
      title: "Link od salonu · pytanie",
      render: (theme) => <LinkAskScreen theme={theme} />,
    },
    {
      title: "Po „Tak”",
      render: (theme) => (
        <ConfirmationScreen
          theme={theme}
          headline="Dziękujemy. Damy Ci znać, gdy przyjdzie pora."
          sub="Odezwiemy się bez pośpiechu, tylko gdy minie trochę czasu. Zawsze możesz to zmienić."
        />
      ),
    },
    {
      title: "Po „Nie”",
      render: (theme) => (
        <ConfirmationScreen
          theme={theme}
          headline="Jasne — nie będziemy przypominać o kolejnej wizycie."
          sub="Twoje umówione wizyty i tak potwierdzimy, bo to część rezerwacji. Zawsze możesz to zmienić."
        />
      ),
    },
  ],
}
