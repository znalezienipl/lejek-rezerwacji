import type { ThemeId } from "@/tokens/design-tokens"
import type { VariantDef } from "./shared"
import { guidedVariant } from "./variant-guided"
import { splitVariant } from "./variant-split"
import { denseVariant } from "./variant-dense"

export const variants: VariantDef[] = [guidedVariant, splitVariant, denseVariant]

export const variantsById: Record<string, VariantDef> = {
  guided: guidedVariant,
  split: splitVariant,
  dense: denseVariant,
}

export const themeOrder: ThemeId[] = ["atelier", "glamour", "wellness"]

export const themeMeta: Record<ThemeId, { brand: string; label: string; palette: string; className: string }> = {
  atelier: {
    brand: "Maison Lumière",
    label: "Luxury Atelier",
    palette: "Ivory · beige · champagne",
    className: "theme-atelier",
  },
  glamour: {
    brand: "NOIR",
    label: "Modern Glamour",
    palette: "Black · burgundy · gold",
    className: "theme-glamour",
  },
  wellness: {
    brand: "Kōa",
    label: "Natural Wellness",
    palette: "Sage · sand · clay",
    className: "theme-wellness",
  },
}

/** All 9 theme × variant combinations. */
export const allMockups = themeOrder.flatMap((theme) =>
  variants.map((variant) => ({ theme, variant })),
)
