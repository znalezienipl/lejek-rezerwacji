/**
 * Znalezieni Beauty Design System — Design Tokens
 * ------------------------------------------------
 * These tokens are the foundation for AI-generated premium beauty websites.
 * Each "direction" is a complete brand system: typography, color, spacing,
 * corners and motion. They are intentionally serializable so they can later
 * feed a generator or a theme editor.
 */

export type ThemeId = "atelier" | "glamour" | "wellness"

export interface TypographyToken {
  /** CSS font-family value used for display / headings */
  heading: string
  /** CSS font-family value used for body copy */
  body: string
  /** Tracking used on eyebrow / overline text */
  eyebrowTracking: string
  /** Preferred heading transform */
  headingCase: "none" | "uppercase"
}

export interface ColorToken {
  background: string
  foreground: string
  muted: string
  accent: string
  border: string
  surface: string
}

export interface SpacingScale {
  /** vertical rhythm between major sections, tailwind spacing */
  section: string
  /** density label */
  density: "compact" | "comfortable" | "airy"
}

export interface CornerScale {
  radius: string
  style: "sharp" | "soft" | "organic"
}

export interface MotionScale {
  /** default reveal duration */
  duration: string
  /** easing curve */
  ease: string
  /** distance elements travel on reveal (px) */
  distance: number
  style: "subtle-fade" | "smooth-reveal" | "premium"
}

export interface DesignTokens {
  id: ThemeId
  label: string
  typography: TypographyToken
  spacing: SpacingScale
  corners: CornerScale
  motion: MotionScale
}

export const designTokens: Record<ThemeId, DesignTokens> = {
  atelier: {
    id: "atelier",
    label: "Luxury Atelier",
    typography: {
      heading: "var(--font-cormorant)",
      body: "var(--font-jost)",
      eyebrowTracking: "0.32em",
      headingCase: "none",
    },
    spacing: { section: "py-28 md:py-40", density: "airy" },
    corners: { radius: "0px", style: "sharp" },
    motion: {
      duration: "1100ms",
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      distance: 28,
      style: "smooth-reveal",
    },
  },
  glamour: {
    id: "glamour",
    label: "Modern Glamour Studio",
    typography: {
      heading: "var(--font-bodoni)",
      body: "var(--font-montserrat)",
      eyebrowTracking: "0.42em",
      headingCase: "uppercase",
    },
    spacing: { section: "py-24 md:py-36", density: "comfortable" },
    corners: { radius: "2px", style: "sharp" },
    motion: {
      duration: "900ms",
      ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      distance: 40,
      style: "premium",
    },
  },
  wellness: {
    id: "wellness",
    label: "Natural Wellness Ritual",
    typography: {
      heading: "var(--font-fraunces)",
      body: "var(--font-nunito)",
      eyebrowTracking: "0.28em",
      headingCase: "none",
    },
    spacing: { section: "py-24 md:py-36", density: "comfortable" },
    corners: { radius: "28px", style: "organic" },
    motion: {
      duration: "1300ms",
      ease: "cubic-bezier(0.33, 1, 0.68, 1)",
      distance: 24,
      style: "subtle-fade",
    },
  },
}
