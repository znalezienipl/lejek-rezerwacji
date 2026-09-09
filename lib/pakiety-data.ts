// Hardcoded prototype data — real salon numbers, NO business logic.
// Nothing here is computed: prices, dates and validity are fixed strings.

export interface Pkg {
  id: string
  count: number
  total: string
  perTreatment: string
  save: string
  validity: string
}

export interface Service {
  id: string
  name: string
  price: string
  duration: string
  interval: string
  packages: Pkg[]
}

export const services: Service[] = [
  {
    id: "kobido",
    name: "Masaż twarzy Kobido",
    price: "180 zł",
    duration: "60 min",
    interval: "zalecany odstęp 4 tygodnie",
    packages: [
      { id: "kobido-4", count: 4, total: "660 zł", perTreatment: "165 zł", save: "60 zł", validity: "90 dni" },
      { id: "kobido-6", count: 6, total: "900 zł", perTreatment: "150 zł", save: "180 zł", validity: "90 dni" },
    ],
  },
  {
    id: "endo",
    name: "Endomasaż + EMS",
    price: "120 zł",
    duration: "60 min",
    interval: "zalecany odstęp 4 dni",
    packages: [
      { id: "endo-4", count: 4, total: "460 zł", perTreatment: "115 zł", save: "20 zł", validity: "31 dni" },
      { id: "endo-8", count: 8, total: "850 zł", perTreatment: "106,25 zł", save: "110 zł", validity: "31 dni" },
    ],
  },
]

export interface SlotOption {
  id: string
  day: string
  date: string
  time: string
  staff: string
}

// Four proposed dates for a 4× Kobido package, in the 4-week rhythm.
export interface ProposedVisit {
  index: number
  day: string
  date: string
  time: string
  staff: string
  /** hardcoded alternative slots shown when editing this visit in place */
  alternatives: SlotOption[]
}

export const proposedVisits: ProposedVisit[] = [
  {
    index: 1,
    day: "środa",
    date: "15 października",
    time: "14:00",
    staff: "Svitlana",
    alternatives: [
      { id: "v1-a", day: "poniedziałek", date: "13 października", time: "10:00", staff: "Bogdana" },
      { id: "v1-b", day: "środa", date: "15 października", time: "14:00", staff: "Svitlana" },
      { id: "v1-c", day: "czwartek", date: "16 października", time: "17:30", staff: "Andrzej" },
    ],
  },
  {
    index: 2,
    day: "środa",
    date: "12 listopada",
    time: "14:00",
    staff: "Svitlana",
    alternatives: [
      { id: "v2-a", day: "wtorek", date: "11 listopada", time: "11:00", staff: "Bogdana" },
      { id: "v2-b", day: "środa", date: "12 listopada", time: "14:00", staff: "Svitlana" },
      { id: "v2-c", day: "piątek", date: "14 listopada", time: "16:00", staff: "Andrzej" },
    ],
  },
  {
    index: 3,
    day: "środa",
    date: "10 grudnia",
    time: "14:00",
    staff: "Bogdana",
    alternatives: [
      { id: "v3-a", day: "poniedziałek", date: "8 grudnia", time: "09:30", staff: "Svitlana" },
      { id: "v3-b", day: "środa", date: "10 grudnia", time: "14:00", staff: "Bogdana" },
      { id: "v3-c", day: "sobota", date: "13 grudnia", time: "12:00", staff: "Andrzej" },
    ],
  },
  {
    index: 4,
    day: "środa",
    date: "7 stycznia",
    time: "14:00",
    staff: "Svitlana",
    alternatives: [
      { id: "v4-a", day: "wtorek", date: "6 stycznia", time: "10:30", staff: "Bogdana" },
      { id: "v4-b", day: "środa", date: "7 stycznia", time: "14:00", staff: "Svitlana" },
      { id: "v4-c", day: "czwartek", date: "8 stycznia", time: "18:00", staff: "Andrzej" },
    ],
  },
]

export const purchasedPackage = {
  name: "4 × Masaż twarzy Kobido",
  total: "660 zł",
  validityUntil: "8 stycznia 2026",
}

// Panel — active package with a mix of realised, booked and unbooked visits.
export interface PanelVisit {
  index: number
  date: string | null
  time: string | null
  staff: string | null
  status: "done" | "booked" | "unbooked"
}

export const panelPackageFull = {
  name: "4 × Masaż twarzy Kobido",
  remaining: "2 z 4",
  validityUntil: "8 stycznia 2026",
  visits: [
    { index: 1, date: "15 października", time: "14:00", staff: "Svitlana", status: "done" },
    { index: 2, date: "12 listopada", time: "14:00", staff: "Svitlana", status: "done" },
    { index: 3, date: "10 grudnia", time: "14:00", staff: "Bogdana", status: "booked" },
    { index: 4, date: null, time: null, staff: null, status: "unbooked" },
  ] as PanelVisit[],
}

// Panel — package near expiry with unused visits (special state 4).
export const panelPackageExpiry = {
  name: "6 × Endomasaż + EMS",
  remaining: "3 z 6",
  validityUntil: "24 października",
  expiresInDays: 5,
  visits: [
    { index: 1, date: "26 września", time: "12:00", staff: "Bogdana", status: "done" },
    { index: 2, date: "1 października", time: "12:00", staff: "Bogdana", status: "done" },
    { index: 3, date: "6 października", time: "12:00", staff: "Andrzej", status: "done" },
    { index: 4, date: null, time: null, staff: null, status: "unbooked" },
    { index: 5, date: null, time: null, staff: null, status: "unbooked" },
    { index: 6, date: null, time: null, staff: null, status: "unbooked" },
  ] as PanelVisit[],
}

// Validity-overflow rhythm for the 6× Kobido warning (special state 1).
// Later visits deliberately fall past the 90-day validity — marked, not blocked.
export const overflowVisits = [
  { index: 1, date: "15 października", within: true },
  { index: 2, date: "12 listopada", within: true },
  { index: 3, date: "10 grudnia", within: true },
  { index: 4, date: "7 stycznia", within: true },
  { index: 5, date: "4 lutego", within: false },
  { index: 6, date: "4 marca", within: false },
]

// Two off-rhythm fallbacks shown when the rhythm window has no free slots (state 2).
export const offRhythmFallbacks: SlotOption[] = [
  { id: "fb-1", day: "wtorek", date: "21 października", time: "11:00", staff: "Andrzej" },
  { id: "fb-2", day: "poniedziałek", date: "27 października", time: "18:30", staff: "Bogdana" },
]
