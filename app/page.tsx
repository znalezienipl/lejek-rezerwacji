import type { Metadata } from "next"
import { ShowcaseLanding } from "@/components/showcase/showcase-landing"

export const metadata: Metadata = {
  title: "Znalezieni Beauty — Premium Website Systems for Beauty Businesses",
  description:
    "One design system, three signature directions. Explore award-worthy website experiences for salons, nail studios, and wellness spaces — crafted by Znalezieni.pl.",
}

export default function Page() {
  return <ShowcaseLanding />
}
