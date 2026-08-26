/**
 * Booking mockup data — shared by all 9 layout mockups.
 * Purely presentational: no state, no logic, no persistence.
 */

import type { ThemeId } from "@/tokens/design-tokens"

export interface BTreatment {
  id: string
  name: string
  description: string
  price: string
  duration: string
  minutes: number
  categoryId: string
  tag?: string
}

export interface BCategory {
  id: string
  name: string
  caption: string
  count: number
}

export interface BSpecialist {
  id: string
  name: string
  role: string
  image: string
  rating: string
}

export interface BSlot {
  from: string
  to: string
  specialistId: string
  state: "free" | "few" | "taken"
}

export const categories: BCategory[] = [
  { id: "face", name: "Face & Skin", caption: "Facials, peels, deep treatments", count: 4 },
  { id: "body", name: "Body & Massage", caption: "Relaxation and sculpting rituals", count: 3 },
  { id: "nails", name: "Hands & Nails", caption: "Manicure, pedicure, nail care", count: 3 },
  { id: "brows", name: "Brows & Lashes", caption: "Shaping, tinting, lifting", count: 2 },
]

export const treatments: BTreatment[] = [
  {
    id: "signature-facial",
    name: "Signature Glow Facial",
    description: "A 90-minute sculpting ritual restoring radiance, tone and deep hydration.",
    price: "480 zł",
    duration: "90 min",
    minutes: 90,
    categoryId: "face",
    tag: "Most loved",
  },
  {
    id: "deep-hydration",
    name: "Deep Hydration Therapy",
    description: "Layered serum infusion for tired, dehydrated skin. Immediate comfort.",
    price: "360 zł",
    duration: "60 min",
    minutes: 60,
    categoryId: "face",
  },
  {
    id: "resurfacing-peel",
    name: "Resurfacing Peel",
    description: "Gentle acid resurfacing that refines texture and evens tone.",
    price: "420 zł",
    duration: "75 min",
    minutes: 75,
    categoryId: "face",
  },
  {
    id: "kobido-lift",
    name: "Kobido Sculpting Lift",
    description: "Traditional Japanese facial massage for natural lift and circulation.",
    price: "390 zł",
    duration: "60 min",
    minutes: 60,
    categoryId: "face",
    tag: "New",
  },
  {
    id: "full-body",
    name: "Full Body Relaxation",
    description: "Slow, warm oil massage across the whole body. Deeply grounding.",
    price: "440 zł",
    duration: "90 min",
    minutes: 90,
    categoryId: "body",
  },
  {
    id: "lymphatic",
    name: "Lymphatic Drainage",
    description: "Light rhythmic technique reducing puffiness and heaviness.",
    price: "320 zł",
    duration: "60 min",
    minutes: 60,
    categoryId: "body",
  },
  {
    id: "back-ritual",
    name: "Back & Shoulder Ritual",
    description: "Focused tension release for neck, shoulders and upper back.",
    price: "240 zł",
    duration: "45 min",
    minutes: 45,
    categoryId: "body",
  },
  {
    id: "signature-manicure",
    name: "Signature Manicure",
    description: "Meticulous nail architecture, cuticle care and a nourishing hand ritual.",
    price: "220 zł",
    duration: "75 min",
    minutes: 75,
    categoryId: "nails",
    tag: "Most loved",
  },
  {
    id: "express-manicure",
    name: "Express Manicure",
    description: "Shape, cuticle tidy and polish. Perfect between appointments.",
    price: "140 zł",
    duration: "45 min",
    minutes: 45,
    categoryId: "nails",
  },
  {
    id: "spa-pedicure",
    name: "Spa Pedicure",
    description: "Softening soak, exfoliation and complete nail care with massage.",
    price: "260 zł",
    duration: "75 min",
    minutes: 75,
    categoryId: "nails",
  },
  {
    id: "brow-architecture",
    name: "Brow Architecture",
    description: "Mapping, shaping and tinting designed around your bone structure.",
    price: "180 zł",
    duration: "45 min",
    minutes: 45,
    categoryId: "brows",
  },
  {
    id: "lash-lift",
    name: "Lash Lift & Tint",
    description: "Natural curl and definition that lasts six to eight weeks.",
    price: "260 zł",
    duration: "60 min",
    minutes: 60,
    categoryId: "brows",
  },
]

export const treatmentsByCategory = categories.map((category) => ({
  category,
  items: treatments.filter((treatment) => treatment.categoryId === category.id),
}))

/** Specialists use each brand's own team photography so mockups stay on-world. */
export const specialistsByTheme: Record<ThemeId, BSpecialist[]> = {
  atelier: [
    { id: "isabelle", name: "Isabelle Rousseau", role: "Founder · Advanced Facials", image: "/images/atelier-team.png", rating: "4.98" },
    { id: "klara", name: "Klara Weber", role: "Lead Aesthetician", image: "/images/atelier-gallery-1.png", rating: "4.95" },
    { id: "nina", name: "Nina Adler", role: "Nail Artisan", image: "/images/atelier-gallery-2.png", rating: "4.97" },
  ],
  glamour: [
    { id: "vera", name: "Vera Kowal", role: "Creative Director", image: "/images/glamour-team.png", rating: "4.99" },
    { id: "sasha", name: "Sasha Lind", role: "Senior Artist", image: "/images/glamour-gallery-2.png", rating: "4.96" },
    { id: "mila", name: "Mila Fontaine", role: "Nail Designer", image: "/images/glamour-gallery-1.png", rating: "4.94" },
  ],
  wellness: [
    { id: "hana", name: "Hana Sato", role: "Lead Therapist · Kobido", image: "/images/wellness-team.png", rating: "4.99" },
    { id: "olga", name: "Olga Brzoza", role: "Holistic Facialist", image: "/images/wellness-gallery-1.png", rating: "4.97" },
    { id: "ida", name: "Ida Lund", role: "Body & Massage", image: "/images/wellness-gallery-2.png", rating: "4.96" },
  ],
}

/** Static calendar grid for March 2026. */
export const calendar = {
  monthLabel: "March 2026",
  weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  /** leading blanks so the 1st lands on Sunday */
  leadingBlanks: 6,
  days: Array.from({ length: 31 }, (_, index) => {
    const date = index + 1
    const soldOut = [2, 3, 9, 16, 23, 30].includes(date)
    const few = [5, 11, 18, 25].includes(date)
    return {
      date,
      state: soldOut ? ("none" as const) : few ? ("few" as const) : ("free" as const),
      selected: date === 12,
    }
  }),
  selectedLabel: "Thursday, 12 March",
}

export const morningSlots: BSlot[] = [
  { from: "09:00", to: "10:30", specialistId: "0", state: "free" },
  { from: "10:00", to: "11:30", specialistId: "1", state: "free" },
  { from: "11:00", to: "12:30", specialistId: "0", state: "few" },
]

export const afternoonSlots: BSlot[] = [
  { from: "13:00", to: "14:30", specialistId: "1", state: "free" },
  { from: "14:30", to: "16:00", specialistId: "2", state: "free" },
  { from: "16:00", to: "17:30", specialistId: "0", state: "taken" },
  { from: "17:30", to: "19:00", specialistId: "1", state: "free" },
]

/** The booking being composed across the mockup screens. */
export const draftBooking = {
  date: "Thursday, 12 March 2026",
  items: [
    {
      treatmentId: "signature-facial",
      name: "Signature Glow Facial",
      from: "14:30",
      to: "16:00",
      duration: "90 min",
      price: "480 zł",
      specialistIndex: 0,
    },
    {
      treatmentId: "signature-manicure",
      name: "Signature Manicure",
      from: "16:00",
      to: "17:15",
      duration: "75 min",
      price: "220 zł",
      specialistIndex: 2,
    },
  ],
  total: "700 zł",
  totalDuration: "2 h 45 min",
  window: "14:30 – 17:15",
}

export const schedulingOptions = [
  {
    id: "back-to-back",
    title: "Right after the first",
    timing: "Same day · 16:00 – 17:15",
    summary: "One continuous visit",
    explanation:
      "Your second treatment starts the moment the first one ends. You arrive once, stay in the salon for the whole block and leave when everything is done.",
    points: ["One visit, one arrival", "No waiting between treatments", "Requires both specialists to be free back-to-back"],
    recommended: true,
  },
  {
    id: "another-day",
    title: "On another day",
    timing: "Pick a new date",
    summary: "Two separate visits",
    explanation:
      "Your second treatment gets its own appointment on a different day. You choose a fresh date and time, and come back for a shorter, separate visit.",
    points: ["Two shorter visits", "Much more choice of times", "Best if you cannot stay for three hours"],
    recommended: false,
  },
]

export const steps = [
  { n: 1, label: "Treatments" },
  { n: 2, label: "Details" },
  { n: 3, label: "Date" },
  { n: 4, label: "Time & specialist" },
  { n: 5, label: "Add more" },
  { n: 6, label: "Scheduling" },
  { n: 7, label: "Summary" },
]

export const screenTitles = [
  "Choose a treatment",
  "Treatment details",
  "Pick a date",
  "Time & specialist",
  "Add another treatment",
  "When should it happen?",
  "Review your booking",
]
