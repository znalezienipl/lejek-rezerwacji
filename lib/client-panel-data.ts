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

/** Loyalty stamps — 10 visits, one free treatment. */
export const loyalty = {
  title: "Loyalty card",
  caption: "Every 10th visit is on us",
  collected: 7,
  total: 10,
  reward: "A complimentary 60-minute treatment of your choice",
  note: "3 more visits to your reward",
}

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
  body: "This is where your appointments, packages and loyalty stamps will live. Book your first treatment and everything will appear here automatically.",
  primary: "Book your first visit",
  secondary: "Browse treatments",
  hints: [
    "Reschedule or cancel in two taps",
    "Your specialist and time range always visible",
    "Packages and stamps counted automatically",
  ],
}

export const panelScreenTitles = [
  "Panel home · upcoming visits",
  "Visit details",
  "Cancel or reschedule",
  "Past visits history",
  "Packages & loyalty",
  "Your details",
  "Empty state · new client",
]
