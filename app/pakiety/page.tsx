import type { Metadata } from "next"
import { PakietyPrototype } from "@/components/pakiety/prototype"

export const metadata: Metadata = {
  title: "Pakiety — makieta rezerwacji i panelu",
  description:
    "Klikalna makieta: pakiet osadzony w naszym siedmiokrokowym lejku, dwa warianty pozostałych terminów, panel klientki i stany szczególne — w trzech światach.",
}

export default function PakietyPage() {
  return <PakietyPrototype />
}
