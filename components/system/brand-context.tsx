"use client"

import { createContext, useContext } from "react"
import { designTokens, type DesignTokens, type ThemeId } from "@/tokens/design-tokens"

const BrandContext = createContext<DesignTokens>(designTokens.atelier)

export function BrandProvider({
  theme,
  children,
}: {
  theme: ThemeId
  children: React.ReactNode
}) {
  return <BrandContext.Provider value={designTokens[theme]}>{children}</BrandContext.Provider>
}

export function useBrand() {
  return useContext(BrandContext)
}
