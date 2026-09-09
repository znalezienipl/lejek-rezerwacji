"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { services } from "@/lib/pakiety-data"
import { Btn, Card, Eyebrow, H, Pill, Radio, ScreenBody } from "./ui"

export function ScreenService({ device, onNext }: { device: "mobile" | "desktop"; onNext: () => void }) {
  const wide = device === "desktop"
  const [serviceId, setServiceId] = useState("kobido")
  // "single" is selected by default — packages never pre-empt the plain visit.
  const [option, setOption] = useState<"single" | string>("single")

  const service = services.find((s) => s.id === serviceId)!

  return (
    <ScreenBody wide={wide}>
      <Eyebrow>Rezerwacja</Eyebrow>
      <H as="h1" className="mt-2 text-[1.7rem]">
        Wybierz zabieg
      </H>

      {/* service switcher */}
      <div className="mt-4 flex flex-wrap gap-2">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setServiceId(s.id)
              setOption("single")
            }}
            className={`min-h-11 rounded-full border px-4 font-sans text-[0.8rem] transition-colors ${
              s.id === serviceId
                ? "border-accent bg-accent/12 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-lg text-foreground">{service.price}</span>
        <span className="font-sans text-[0.72rem] text-muted-foreground">
          {service.duration} · {service.interval}
        </span>
      </div>

      {/* options */}
      <div className={`mt-5 flex flex-col gap-3 ${wide ? "sm:grid sm:grid-cols-3 sm:items-stretch" : ""}`}>
        {/* single visit — default */}
        <Card
          as="button"
          selected={option === "single"}
          onClick={() => setOption("single")}
          className="flex items-start gap-3"
        >
          <Radio checked={option === "single"} />
          <span className="flex flex-col">
            <span className="font-sans text-[0.9rem] font-medium text-foreground">Pojedyncza wizyta</span>
            <span className="mt-0.5 font-sans text-[0.72rem] text-muted-foreground">
              Jeden zabieg, {service.price}
            </span>
          </span>
        </Card>

        {/* packages */}
        {service.packages.map((pkg) => (
          <Card
            key={pkg.id}
            as="button"
            selected={option === pkg.id}
            onClick={() => setOption(pkg.id)}
            className="flex flex-col gap-3"
          >
            <div className="flex items-start gap-3">
              <Radio checked={option === pkg.id} />
              <span className="flex flex-1 flex-col">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-sans text-[0.9rem] font-medium text-foreground">
                    Pakiet {pkg.count} wizyt
                  </span>
                  <Pill tone="accent">−{pkg.save}</Pill>
                </span>
                <span className="mt-2 flex items-baseline gap-2">
                  <span className="font-serif text-lg text-foreground">{pkg.total}</span>
                  <span className="font-sans text-[0.72rem] text-muted-foreground">
                    {pkg.perTreatment} za zabieg
                  </span>
                </span>
                <span className="mt-1 font-sans text-[0.68rem] text-muted-foreground">
                  ważność {pkg.validity} · terminy umawiasz od razu
                </span>
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Btn full onClick={onNext}>
          {option === "single" ? "Dalej — wybierz termin" : "Dalej — wybierz terminy"}
          <ArrowRight className="size-4" aria-hidden />
        </Btn>
        {option !== "single" && (
          <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-[0.68rem] text-muted-foreground">
            <Check className="size-3.5 text-accent" aria-hidden />
            Płatność w salonie — online jeszcze nie prowadzimy
          </p>
        )}
      </div>
    </ScreenBody>
  )
}
