import type { Metadata } from "next"
import { BrandPage } from "@/components/brand-page"
import { glamourConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${glamourConfig.brandName} — ${glamourConfig.tagline}`,
  description: glamourConfig.hero.subtitle,
}

export default function GlamourPage() {
  return <BrandPage config={glamourConfig} />
}
