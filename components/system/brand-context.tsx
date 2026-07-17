"use client"

import { createContext, useContext } from "react"
import { designTokens } from "@/tokens/design-tokens"
import { atelierConfig, type BrandConfig } from "@/lib/site-config"

const BrandContext = createContext<BrandConfig>(atelierConfig)

export function BrandProvider({
  config,
  children,
}: {
  config: BrandConfig
  children: React.ReactNode
}) {
  return <BrandContext.Provider value={config}>{children}</BrandContext.Provider>
}

/** Returns the full brand config (content + theme id) for the current brand. */
export function useBrand() {
  return useContext(BrandContext)
}

/** Convenience hook returning the design tokens for the current brand's theme. */
export function useTokens() {
  const config = useContext(BrandContext)
  return designTokens[config.theme]
}
