import type { Metadata } from "next"
import { PakietyPrototype } from "@/components/pakiety/prototype"

export const metadata: Metadata = {
  title: "Pakiety — makieta rezerwacji i panelu",
  description:
    "Klikalna makieta: wybór usługi, wybór terminów (dwa warianty), podsumowanie oraz panel klientki z pięcioma stanami.",
}

export default function PakietyPage() {
  return <PakietyPrototype />
}
