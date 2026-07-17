import type { Metadata } from "next"
import { BrandPage } from "@/components/brand-page"
import { atelierConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${atelierConfig.brandName} — ${atelierConfig.tagline}`,
  description: atelierConfig.hero.subtitle,
}

export default function AtelierPage() {
  return <BrandPage config={atelierConfig} />
}
