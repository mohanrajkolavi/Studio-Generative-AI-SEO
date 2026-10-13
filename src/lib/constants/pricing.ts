/**
 * Kolavi Studio — tier identifiers used by the contact page's
 * `?tier=` badge. Prices are intentionally not stored here: pricing is
 * quoted per project by email (see PricingSection and /pricing).
 */

export type TierId = "visibility" | "growth" | "dominance";

export interface TierSummary {
  id: TierId;
  name: string;
}

// Ids are kept for existing ?tier= links; names match the tiers on /pricing.
export const TIER_SUMMARIES: TierSummary[] = [
  { id: "visibility", name: "Marketing" },
  { id: "growth", name: "Growth" },
  { id: "dominance", name: "Full System" },
];
