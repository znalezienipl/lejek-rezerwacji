import { BrandProvider } from "@/components/system/brand-context"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { Hero } from "@/components/sections/hero/hero"
import { Story } from "@/components/sections/story/story"
import { Services } from "@/components/sections/services/services"
import { Gallery } from "@/components/sections/gallery/gallery"
import { Team } from "@/components/sections/team/team"
import { Reviews } from "@/components/sections/reviews/reviews"
import { Booking } from "@/components/sections/booking/booking"
import type { BrandConfig } from "@/lib/site-config"

export function BrandPage({ config }: { config: BrandConfig }) {
  return (
    <BrandProvider config={config}>
      <div className={`theme-${config.theme} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <SiteNav />
        <main>
          <Hero config={config} />
          <Story config={config} />
          <Services config={config} />
          <Gallery config={config} />
          <Team config={config} />
          <Reviews />
          <Booking />
        </main>
        <SiteFooter />
      </div>
    </BrandProvider>
  )
}
