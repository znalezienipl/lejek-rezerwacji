import type { Metadata } from "next"
import { BrandPage } from "@/components/brand-page"
import { wellnessConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${wellnessConfig.brandName} — ${wellnessConfig.tagline}`,
  description: wellnessConfig.hero.subtitle,
}

export default function WellnessPage() {
  return <BrandPage config={wellnessConfig} />
}
