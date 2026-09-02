/**
 * Client panel mockup data — the place a client lands after booking,
 * usually from an email/SMS link. Purely presentational.
 *
 * Deliberately reuses the vocabulary of `booking-data.ts` (price strings,
 * from–to time ranges, specialistIndex) so the booking flow and the panel
 * read as two parts of one product.
 */

export interface PAppointment {
  id: string
  /** Grouped visit may hold two treatments — same shape as draftBooking.items */
  date: string
  dateShort: string
  weekday: string
  window: string
  total: string
  totalDuration: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  items: {
    name: string
    from: string
    to: string
    duration: string
    price: string
    specialistIndex: number
  }[]
}

export const clientProfile = {
  name: "Anna Kowalska",
  initials: "AK",
  since: "Client since June 2024",
  visits: 12,
  email: "anna.kowalska@email.com",
  phone: "+48 601 204 118",
  birthday: "14 August",
  notes: "Sensitive skin around the nose. Prefers unscented products.",
  preferredSpecialistIndex: 0,
}

/** Two upcoming visits: one is a back-to-back double booking. */
export const upcomingAppointments: PAppointment[] = [
  {
    id: "up-1",
    date: "Thursday, 12 March 2026",
    dateShort: "12 Mar",
    weekday: "Thu",
    window: "14:30 – 17:15",
    total: "700 zł",
    totalDuration: "2 h 45 min",
    status: "confirmed",
    items: [
      {
        name: "Signature Glow Facial",
        from: "14:30",
        to: "16:00",
        duration: "90 min",
        price: "480 zł",
        specialistIndex: 0,
      },
      {
        name: "Signature Manicure",
        from: "16:00",
        to: "17:15",
        duration: "75 min",
        price: "220 zł",
        specialistIndex: 2,
      },
    ],
  },
  {
    id: "up-2",
    date: "Tuesday, 7 April 2026",
    dateShort: "7 Apr",
    weekday: "Tue",
    window: "11:00 – 12:00",
    total: "390 zł",
    totalDuration: "60 min",
    status: "pending",
    items: [
      {
        name: "Kobido Sculpting Lift",
        from: "11:00",
        to: "12:00",
        duration: "60 min",
        price: "390 zł",
        specialistIndex: 0,
      },
    ],
  },
]

export const pastAppointments: PAppointment[] = [
  {
    id: "past-1",
    date: "Wednesday, 18 February 2026",
    dateShort: "18 Feb",
    weekday: "Wed",
    window: "10:00 – 11:15",
    total: "220 zł",
    totalDuration: "75 min",
    status: "completed",
    items: [
      {
        name: "Signature Manicure",
        from: "10:00",
        to: "11:15",
        duration: "75 min",
        price: "220 zł",
        specialistIndex: 2,
      },
    ],
  },
  {
    id: "past-2",
    date: "Friday, 23 January 2026",
    dateShort: "23 Jan",
    weekday: "Fri",
    window: "16:00 – 17:30",
    total: "480 zł",
    totalDuration: "90 min",
    status: "completed",
    items: [
      {
        name: "Signature Glow Facial",
        from: "16:00",
        to: "17:30",
        duration: "90 min",
        price: "480 zł",
        specialistIndex: 0,
      },
    ],
  },
  {
    id: "past-3",
    date: "Monday, 8 December 2025",
    dateShort: "8 Dec",
    weekday: "Mon",
    window: "13:00 – 14:00",
    total: "320 zł",
    totalDuration: "60 min",
    status: "completed",
    items: [
      {
        name: "Lymphatic Drainage",
        from: "13:00",
        to: "14:00",
        duration: "60 min",
        price: "320 zł",
        specialistIndex: 1,
      },
    ],
  },
  {
    id: "past-4",
    date: "Saturday, 15 November 2025",
    dateShort: "15 Nov",
    weekday: "Sat",
    window: "09:30 – 10:45",
    total: "0 zł",
    totalDuration: "75 min",
    status: "cancelled",
    items: [
      {
        name: "Spa Pedicure",
        from: "09:30",
        to: "10:45",
        duration: "75 min",
        price: "260 zł",
        specialistIndex: 2,
      },
    ],
  },
]

/** Packages / karnety — always rendered as a progress track, never a bare number. */
export const packages = [
  {
    id: "pkg-facial",
    name: "Facial Ritual Package",
    caption: "Signature Glow Facial",
    used: 3,
    total: 5,
    validUntil: "Valid until 30 Sep 2026",
    perVisit: "384 zł per visit",
    saved: "Saves 480 zł",
  },
  {
    id: "pkg-massage",
    name: "Body & Massage Package",
    caption: "Any 60-minute massage",
    used: 8,
    total: 10,
    validUntil: "Valid until 12 Jun 2026",
    perVisit: "288 zł per visit",
    saved: "Saves 320 zł",
  },
]

/**
 * Visit-discount programme — NOT a stamp card.
 *
 * The salon counts VISITS (one counter across every covered service), and at
 * certain visit numbers that single visit is cheaper by a percentage. The
 * discount is not permanent: after a threshold the client returns to the base
 * price and keeps counting toward the next one.
 *
 * The number of thresholds and their values differ per salon, so nothing that
 * consumes this may assume there are exactly three.
 */
export interface RewardThreshold {
  /** Visit number whose price is reduced. */
  visit: number
  /** Percentage off that one visit. */
  discount: number
}

export const rewardsProgram = {
  clientName: "Anna",
  coveredLabel: "Masaże i zabiegi na ciało",
  coveredNote: "Nie wszystkie usługi z cennika są objęte.",
  thresholds: [
    { visit: 6, discount: 10 },
    { visit: 12, discount: 15 },
    { visit: 18, discount: 20 },
  ] as RewardThreshold[],
}

export type RewardStatus = "empty" | "collecting" | "close" | "due"

export interface RewardView {
  status: RewardStatus
  visits: number
  /** Thresholds already crossed — history, not an active benefit. */
  passed: RewardThreshold[]
  /** Threshold that lands exactly now: the nearest visit is discounted. */
  due: RewardThreshold | null
  /** Next threshold still ahead (null once all are behind). */
  next: RewardThreshold | null
  /** Visits left until `next`. */
  remaining: number
  /** Progress bar spans the leg between the previous and the next milestone. */
  barBase: number
  barTarget: number
  barFilled: number
}

/** Pure derivation so every state and every salon shape flows from one rule. */
export function deriveReward(
  visits: number,
  thresholds: RewardThreshold[] = rewardsProgram.thresholds,
): RewardView {
  const sorted = [...thresholds].sort((a, b) => a.visit - b.visit)
  const first = sorted[0] ?? null

  if (visits <= 0) {
    return {
      status: "empty",
      visits: 0,
      passed: [],
      due: null,
      next: first,
      remaining: first?.visit ?? 0,
      barBase: 0,
      barTarget: first?.visit ?? 1,
      barFilled: 0,
    }
  }

  const due = sorted.find((t) => t.visit === visits) ?? null
  const passed = sorted.filter((t) => t.visit < visits)
  const next = sorted.find((t) => t.visit > visits) ?? null
  const prevVisit = passed.length ? passed[passed.length - 1].visit : 0

  let barBase: number
  let barTarget: number
  let barFilled: number
  if (due) {
    barBase = prevVisit
    barTarget = due.visit
    barFilled = barTarget - barBase
  } else if (next) {
    barBase = prevVisit
    barTarget = next.visit
    barFilled = visits - barBase
  } else {
    barBase = prevVisit
    barTarget = visits
    barFilled = visits - barBase
  }

  const remaining = next ? next.visit - visits : 0
  const status: RewardStatus = due ? "due" : next && remaining === 1 ? "close" : "collecting"

  return { status, visits, passed, due, next, remaining, barBase, barTarget, barFilled }
}

/** The five states the rewards screen must present, in review order. */
export const rewardStates: { id: string; label: string; visits: number }[] = [
  { id: "collecting", label: "Zbiera", visits: 4 },
  { id: "close", label: "Blisko", visits: 5 },
  { id: "due", label: "Zniżka należna", visits: 6 },
  { id: "past", label: "Po pierwszym progu", visits: 8 },
  { id: "empty", label: "Pusto", visits: 0 },
]

export const panelTabs = [
  { id: "upcoming", label: "Upcoming", count: 2 },
  { id: "past", label: "Past", count: 4 },
]

/** Reasons offered when cancelling — keeps the mockup honest about policy. */
export const cancelPolicy = {
  headline: "Free until 10 March, 14:30",
  points: [
    "Cancel more than 48 h before: no charge at all",
    "Between 48 h and 24 h before: 30% of the treatment price",
    "Less than 24 h before: the full price is charged",
  ],
}

export const rescheduleSuggestions = [
  { from: "10:00", to: "12:45", date: "Friday, 13 March", specialistIndex: 0, note: "Same specialists" },
  { from: "14:30", to: "17:15", date: "Monday, 16 March", specialistIndex: 0, note: "Same time of day" },
  { from: "09:00", to: "11:45", date: "Thursday, 19 March", specialistIndex: 1, note: "Different facialist" },
]

/** Copy for the new-client empty state. */
export const emptyState = {
  title: "No visits yet",
  body: "This is where your appointments, packages and visit discounts will live. Book your first treatment and everything will appear here automatically.",
  primary: "Book your first visit",
  secondary: "Browse treatments",
  hints: [
    "Reschedule or cancel in two taps",
    "Your specialist and time range always visible",
    "Visits counted automatically toward your next discount",
  ],
}

export const panelScreenTitles = [
  "Panel home · upcoming visits",
  "Visit details",
  "Cancel or reschedule",
  "Past visits history",
  "Packages & visit discounts",
  "Your details",
  "Empty state · new client",
]
