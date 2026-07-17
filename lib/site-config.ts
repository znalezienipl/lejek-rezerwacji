import type { ThemeId } from "@/tokens/design-tokens"

/**
 * Znalezieni Beauty — Site Configuration
 * --------------------------------------
 * Every brand demo is driven entirely by one of these config objects.
 * Nothing about a specific salon (name, prices, team, services) is hardcoded
 * inside components — it all flows from here, ready for extraction into a
 * reusable, AI-generated website foundation.
 */

export interface NavLink {
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  titleAccent?: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image: string
  imageAlt: string
  /** small proof line under the CTA */
  note?: string
}

export interface StoryContent {
  eyebrow: string
  title: string
  paragraphs: string[]
  signature?: string
  signatureRole?: string
  image: string
  imageAlt: string
  stats?: { value: string; label: string }[]
}

export interface ServiceItem {
  name: string
  description: string
  price: string
  duration: string
  tag?: string
}

export interface ServicesContent {
  eyebrow: string
  title: string
  intro: string
  items: ServiceItem[]
}

export interface GalleryItem {
  image: string
  alt: string
  caption?: string
  /** span hint for editorial masonry layouts */
  span?: "tall" | "wide" | "normal"
}

export interface GalleryContent {
  eyebrow: string
  title: string
  intro: string
  items: GalleryItem[]
}

export interface TeamMember {
  name: string
  role: string
  specialty: string
  image: string
}

export interface TeamContent {
  eyebrow: string
  title: string
  intro: string
  members: TeamMember[]
}

export interface Review {
  quote: string
  author: string
  detail: string
}

export interface ReviewsContent {
  eyebrow: string
  title: string
  rating: string
  reviews: Review[]
}

export interface BookingContent {
  eyebrow: string
  title: string
  subtitle: string
  cta: { label: string; href: string }
  perks: string[]
}

export interface ContactContent {
  address: string[]
  phone: string
  email: string
  hours: { day: string; time: string }[]
  socials: { label: string; href: string }[]
}

export interface BrandConfig {
  theme: ThemeId
  slug: string
  brandName: string
  tagline: string
  location: string
  nav: NavLink[]
  hero: HeroContent
  story: StoryContent
  services: ServicesContent
  gallery: GalleryContent
  team: TeamContent
  reviews: ReviewsContent
  booking: BookingContent
  contact: ContactContent
}

const sharedNav: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "Treatments", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#booking" },
]

/* ------------------------------------------------------------------ */
/* DIRECTION 1 — LUXURY ATELIER                                        */
/* ------------------------------------------------------------------ */
export const atelierConfig: BrandConfig = {
  theme: "atelier",
  slug: "atelier",
  brandName: "Maison Lumière",
  tagline: "Atelier de Beauté",
  location: "Warszawa · Mokotów",
  nav: sharedNav,
  hero: {
    eyebrow: "Atelier de Beauté — est. 2014",
    title: "Beauty, treated as",
    titleAccent: "a quiet art.",
    subtitle:
      "An intimate boutique where every treatment is composed with intention. Refined skincare, considered detail, and the calm luxury of being truly cared for.",
    primaryCta: { label: "Reserve your visit", href: "#booking" },
    secondaryCta: { label: "Explore treatments", href: "#services" },
    image: "/images/atelier-hero.png",
    imageAlt: "Close-up of a woman with luminous, flawless skin in soft ivory light",
    note: "By appointment only · A private atelier experience",
  },
  story: {
    eyebrow: "Our Philosophy",
    title: "We believe beauty should feel effortless, never rushed.",
    paragraphs: [
      "Maison Lumière was born from a simple conviction — that true luxury is found in restraint. No noise, no excess. Only the essential, performed beautifully.",
      "Each visit begins in stillness. We read your skin, we listen, and we compose a ritual designed for you alone. The result is not a service, but a moment that lingers long after you leave.",
    ],
    signature: "Isabelle Rousseau",
    signatureRole: "Founder & Master Aesthetician",
    image: "/images/atelier-story.png",
    imageAlt: "Elegant hands with a nude manicure resting on ivory linen",
    stats: [
      { value: "10+", label: "Years of craft" },
      { value: "4.9", label: "Guest rating" },
      { value: "12k", label: "Rituals composed" },
    ],
  },
  services: {
    eyebrow: "The Treatments",
    title: "A curated menu of signature rituals.",
    intro:
      "Each treatment is a study in detail — using rare formulations and techniques refined over a decade of practice.",
    items: [
      {
        name: "Signature Lumière Facial",
        description:
          "A 90-minute sculpting ritual restoring radiance, tone and deep hydration with cold-pressed botanicals.",
        price: "from 480 zł",
        duration: "90 min",
        tag: "Most loved",
      },
      {
        name: "The Atelier Manicure",
        description:
          "Meticulous nail architecture, cuticle care and a hand ritual finished with a nourishing wax immersion.",
        price: "from 220 zł",
        duration: "75 min",
      },
      {
        name: "Golden Hour Glow",
        description:
          "A luminous pre-event treatment combining lymphatic massage, radiance masking and a dewy finish.",
        price: "from 390 zł",
        duration: "60 min",
      },
      {
        name: "Private Bridal Composition",
        description:
          "A bespoke multi-session experience designed around your day, from trial to final touch.",
        price: "on request",
        duration: "bespoke",
        tag: "Bespoke",
      },
    ],
  },
  gallery: {
    eyebrow: "The Atelier",
    title: "A world composed in ivory and light.",
    intro: "Moments from the maison — where every detail is intentional.",
    items: [
      { image: "/images/atelier-gallery-1.png", alt: "Luxury facial treatment in progress", span: "tall" },
      { image: "/images/atelier-gallery-2.png", alt: "Refined nude manicure on champagne silk", span: "normal" },
      { image: "/images/atelier-story.png", alt: "Elegant manicured hands on linen", span: "normal" },
      { image: "/images/atelier-hero.png", alt: "Luminous glowing skin in soft light", span: "wide" },
    ],
  },
  team: {
    eyebrow: "The Hands",
    title: "Artisans of the maison.",
    intro: "A small, devoted team — each a specialist in their own quiet craft.",
    members: [
      { name: "Isabelle Rousseau", role: "Founder", specialty: "Advanced Facials", image: "/images/atelier-team.png" },
      { name: "Klara Weber", role: "Lead Aesthetician", specialty: "Skin Architecture", image: "/images/atelier-gallery-1.png" },
      { name: "Nina Adler", role: "Nail Artisan", specialty: "The Atelier Manicure", image: "/images/atelier-gallery-2.png" },
    ],
  },
  reviews: {
    eyebrow: "In Their Words",
    title: "The quiet loyalty of those who know.",
    rating: "4.9 / 5 · 600+ reviews",
    reviews: [
      {
        quote:
          "It doesn't feel like a salon. It feels like being let into a secret. My skin has never looked like this.",
        author: "Aleksandra M.",
        detail: "Guest since 2019",
      },
      {
        quote:
          "Every detail is considered. The tea, the light, the touch. I leave feeling like the most cared-for person alive.",
        author: "Julia K.",
        detail: "Signature Facial",
      },
      {
        quote: "Understated perfection. This is what luxury is supposed to feel like.",
        author: "Marta W.",
        detail: "Bridal Composition",
      },
    ],
  },
  booking: {
    eyebrow: "Reserve",
    title: "Your ritual awaits.",
    subtitle:
      "Appointments are intimate and limited. Reserve your moment and let us compose something entirely yours.",
    cta: { label: "Book your appointment", href: "#" },
    perks: ["Private, unhurried sessions", "Complimentary skin consultation", "Cancel up to 48h prior"],
  },
  contact: {
    address: ["ul. Puławska 22", "02-512 Warszawa", "Poland"],
    phone: "+48 22 000 00 00",
    email: "hello@maisonlumiere.pl",
    hours: [
      { day: "Tue – Fri", time: "10:00 – 20:00" },
      { day: "Saturday", time: "09:00 – 17:00" },
      { day: "Sun – Mon", time: "By appointment" },
    ],
    socials: [
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* DIRECTION 2 — MODERN GLAMOUR STUDIO                                 */
/* ------------------------------------------------------------------ */
export const glamourConfig: BrandConfig = {
  theme: "glamour",
  slug: "glamour",
  brandName: "NOIR",
  tagline: "Beauty Studio",
  location: "Warszawa · Śródmieście",
  nav: sharedNav,
  hero: {
    eyebrow: "The Studio Everyone's Talking About",
    title: "Turn heads.",
    titleAccent: "Own the room.",
    subtitle:
      "Bold beauty for people with something to say. Statement nails, dramatic lashes, and hair that photographs like a campaign.",
    primaryCta: { label: "Book your glow-up", href: "#booking" },
    secondaryCta: { label: "See the looks", href: "#gallery" },
    image: "/images/glamour-hero.png",
    imageAlt: "Dramatic high-fashion beauty portrait with bold makeup and gold light",
    note: "Featured in 3 beauty editorials this year",
  },
  story: {
    eyebrow: "Our Attitude",
    title: "We don't do subtle. We do unforgettable.",
    paragraphs: [
      "NOIR is where beauty gets loud. We built this studio for the ones who walk in wanting to feel like the main character — and walk out being exactly that.",
      "Every look is engineered for impact and made for the camera. Because your beauty deserves more than a mirror. It deserves an audience.",
    ],
    signature: "Wiktoria Zielińska",
    signatureRole: "Creative Director",
    image: "/images/glamour-story.png",
    imageAlt: "Dramatic close-up of glossy lips and bold lashes with gold shimmer",
    stats: [
      { value: "50k", label: "Instagram family" },
      { value: "#1", label: "Rated in the city" },
      { value: "8", label: "Award-winning artists" },
    ],
  },
  services: {
    eyebrow: "The Menu",
    title: "Signature looks, zero compromise.",
    intro: "Every service is a statement. Pick your drama.",
    items: [
      {
        name: "The Runway Set",
        description: "Sculptural nail art designed to be noticed. Custom shapes, chrome, crystals — your canvas.",
        price: "from 320 zł",
        duration: "120 min",
        tag: "Signature",
      },
      {
        name: "Volume Lash Drama",
        description: "Mega-volume lashes hand-mapped to your eye shape for full campaign-level intensity.",
        price: "from 380 zł",
        duration: "150 min",
      },
      {
        name: "Editorial Blowout",
        description: "Voluminous, glossy, camera-ready hair with a finish that lasts all night.",
        price: "from 260 zł",
        duration: "75 min",
      },
      {
        name: "Full Glam Package",
        description: "The complete transformation — nails, lashes, hair and makeup for your moment.",
        price: "from 890 zł",
        duration: "half day",
        tag: "Bestseller",
      },
    ],
  },
  gallery: {
    eyebrow: "The Looks",
    title: "Straight off the grid.",
    intro: "The work speaks for itself. Tag us in yours.",
    items: [
      { image: "/images/glamour-gallery-2.png", alt: "Glamorous styled hair beauty portrait", span: "tall" },
      { image: "/images/glamour-gallery-1.png", alt: "Dramatic dark burgundy and gold nail art", span: "normal" },
      { image: "/images/glamour-story.png", alt: "Bold glossy lips and lashes with gold shimmer", span: "normal" },
      { image: "/images/glamour-hero.png", alt: "High-fashion beauty portrait with bold makeup", span: "wide" },
    ],
  },
  team: {
    eyebrow: "The Artists",
    title: "The talent behind the looks.",
    intro: "Award-winning artists with serious point of view.",
    members: [
      { name: "Wiktoria Zielińska", role: "Creative Director", specialty: "Editorial Glam", image: "/images/glamour-team.png" },
      { name: "Dominika Nowak", role: "Lash Architect", specialty: "Volume & Drama", image: "/images/glamour-gallery-2.png" },
      { name: "Alex Kaczmarek", role: "Nail Artist", specialty: "Sculptural Sets", image: "/images/glamour-gallery-1.png" },
    ],
  },
  reviews: {
    eyebrow: "The Reviews",
    title: "Obsessed. Every single one.",
    rating: "4.9 / 5 · 1,200+ reviews",
    reviews: [
      {
        quote: "I walked out and literally three people stopped me on the street. This is THE place.",
        author: "Karolina S.",
        detail: "Full Glam Package",
      },
      {
        quote: "My lashes broke the internet. Cannot stop getting compliments. Booking again immediately.",
        author: "Ada P.",
        detail: "Volume Lash Drama",
      },
      {
        quote: "Best nails of my entire life. The detail is insane. Worth every złoty.",
        author: "Nikola R.",
        detail: "The Runway Set",
      },
    ],
  },
  booking: {
    eyebrow: "Ready?",
    title: "Your transformation starts now.",
    subtitle: "Slots fill fast — the good ones always do. Lock in your look before someone else does.",
    cta: { label: "Claim your slot", href: "#" },
    perks: ["Free look consultation", "Photo-ready guarantee", "Flexible rescheduling"],
  },
  contact: {
    address: ["ul. Nowy Świat 40", "00-363 Warszawa", "Poland"],
    phone: "+48 22 111 11 11",
    email: "hey@noirstudio.pl",
    hours: [
      { day: "Mon – Fri", time: "10:00 – 21:00" },
      { day: "Saturday", time: "10:00 – 19:00" },
      { day: "Sunday", time: "12:00 – 18:00" },
    ],
    socials: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "Pinterest", href: "#" },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* DIRECTION 3 — NATURAL WELLNESS RITUAL                               */
/* ------------------------------------------------------------------ */
export const wellnessConfig: BrandConfig = {
  theme: "wellness",
  slug: "wellness",
  brandName: "Kōa",
  tagline: "Wellness & Skin Rituals",
  location: "Kraków · Kazimierz",
  nav: sharedNav,
  hero: {
    eyebrow: "A Sanctuary for the Senses",
    title: "Slow down.",
    titleAccent: "Come back to yourself.",
    subtitle:
      "A calm retreat for the face and body. Japanese-inspired rituals, natural touch, and the deep quiet of true rest.",
    primaryCta: { label: "Begin your ritual", href: "#booking" },
    secondaryCta: { label: "Discover the rituals", href: "#services" },
    image: "/images/wellness-hero.png",
    imageAlt: "Serene woman relaxing during a calming facial treatment in soft natural light",
    note: "Nestled in a restored townhouse garden",
  },
  story: {
    eyebrow: "Our Approach",
    title: "Wellness is not a service. It is a return.",
    paragraphs: [
      "Kōa is built around a single idea — that beauty flows from balance. We work with the body's natural rhythms, never against them, using our hands, breath and time as our finest tools.",
      "Here there is no rush. Only warm light, natural aromas, and the space to exhale. You arrive carrying the week. You leave lighter than you came.",
    ],
    signature: "Hanna Lewandowska",
    signatureRole: "Founder & Kobido Master",
    image: "/images/wellness-story.png",
    imageAlt: "Natural spa still life with stones, botanicals and facial oil in sage tones",
    stats: [
      { value: "100%", label: "Natural formulas" },
      { value: "4.9", label: "Guest rating" },
      { value: "7", label: "Signature rituals" },
    ],
  },
  services: {
    eyebrow: "The Rituals",
    title: "Treatments that move at the pace of rest.",
    intro: "Each ritual is a slow, intentional journey — designed to restore, not just to treat.",
    items: [
      {
        name: "Kobido Sculpting Ritual",
        description: "The ancient Japanese facial massage — lifting, releasing tension and restoring a natural glow.",
        price: "from 340 zł",
        duration: "80 min",
        tag: "Signature",
      },
      {
        name: "Forest Bathing Facial",
        description: "A deeply calming treatment with warm compresses, botanical oils and pressure-point work.",
        price: "from 290 zł",
        duration: "70 min",
      },
      {
        name: "Full-Body Slow Ritual",
        description: "A grounding massage using warm stones and natural oils to release the whole body.",
        price: "from 420 zł",
        duration: "100 min",
      },
      {
        name: "The Reset Half-Day",
        description: "A layered journey of facial, body and rest — your complete return to balance.",
        price: "from 780 zł",
        duration: "half day",
        tag: "Retreat",
      },
    ],
  },
  gallery: {
    eyebrow: "The Sanctuary",
    title: "A space that breathes with you.",
    intro: "Soft light, natural texture, and quiet moments of care.",
    items: [
      { image: "/images/wellness-gallery-1.png", alt: "Serene kobido facial massage in progress", span: "tall" },
      { image: "/images/wellness-gallery-2.png", alt: "Relaxing body massage with natural oil", span: "normal" },
      { image: "/images/wellness-story.png", alt: "Natural spa still life with botanicals", span: "normal" },
      { image: "/images/wellness-hero.png", alt: "Woman relaxing during a calming facial", span: "wide" },
    ],
  },
  team: {
    eyebrow: "The Therapists",
    title: "Hands that listen.",
    intro: "Trained in touch, presence and the art of slowing down.",
    members: [
      { name: "Hanna Lewandowska", role: "Founder", specialty: "Kobido Master", image: "/images/wellness-team.png" },
      { name: "Zofia Mazur", role: "Lead Therapist", specialty: "Facial Rituals", image: "/images/wellness-gallery-1.png" },
      { name: "Lena Kowalczyk", role: "Body Therapist", specialty: "Slow Massage", image: "/images/wellness-gallery-2.png" },
    ],
  },
  reviews: {
    eyebrow: "Reflections",
    title: "Guests describe it as coming home.",
    rating: "4.9 / 5 · 800+ reviews",
    reviews: [
      {
        quote: "I didn't realise how much tension I was holding until it melted away. I cried a little. In a good way.",
        author: "Ewa T.",
        detail: "Kobido Ritual",
      },
      {
        quote: "The most peaceful hour of my month. My skin glows and my mind is finally quiet.",
        author: "Magda B.",
        detail: "Forest Bathing Facial",
      },
      {
        quote: "It feels less like a treatment and more like being taken care of by an old friend.",
        author: "Ola J.",
        detail: "The Reset Half-Day",
      },
    ],
  },
  booking: {
    eyebrow: "Begin",
    title: "Give yourself the hour.",
    subtitle: "You deserve the pause. Reserve your ritual and let everything else wait.",
    cta: { label: "Reserve your ritual", href: "#" },
    perks: ["Herbal tea on arrival", "Natural, cruelty-free products", "Quiet garden lounge access"],
  },
  contact: {
    address: ["ul. Józefa 12", "31-056 Kraków", "Poland"],
    phone: "+48 12 222 22 22",
    email: "hello@koa-rituals.pl",
    hours: [
      { day: "Mon – Fri", time: "09:00 – 20:00" },
      { day: "Saturday", time: "09:00 – 18:00" },
      { day: "Sunday", time: "10:00 – 16:00" },
    ],
    socials: [
      { label: "Instagram", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
}

export const brandConfigs: Record<string, BrandConfig> = {
  atelier: atelierConfig,
  glamour: glamourConfig,
  wellness: wellnessConfig,
}
