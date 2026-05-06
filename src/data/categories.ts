import type { Category } from "./schema";

/**
 * Category metadata — single source of truth for opportunity badges,
 * filters, and modal labels in the Dubai real-estate intelligence feed.
 */

export interface CategoryMeta {
  id: Category;
  label: string;
  short: string;
  blurb: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  distress: {
    id: "distress",
    label: "DISTRESS",
    short: "!",
    blurb: "Urgent sellers, under-market asks, mortgage or timeline pressure",
  },
  offplan: {
    id: "offplan",
    label: "OFF-PLAN",
    short: "◇",
    blurb: "Developer launches, payment plans, resale assignments, handover risk",
  },
  ready: {
    id: "ready",
    label: "READY",
    short: "✓",
    blurb: "Completed units, vacant possession, owner-occupied or tenanted stock",
  },
  rental: {
    id: "rental",
    label: "RENTAL",
    short: "%",
    blurb: "Long-let, short-let, holiday-home yield and rent-comps opportunities",
  },
  flip: {
    id: "flip",
    label: "FLIP",
    short: "↻",
    blurb: "Renovation, furnishing, layout, or quick-resale upside",
  },
  developer: {
    id: "developer",
    label: "DEVELOPER",
    short: "D",
    blurb: "Launches, inventories, incentives, post-handover offers",
  },
  auction: {
    id: "auction",
    label: "AUCTION",
    short: "⚖",
    blurb: "Court, bank, and Emirates Auction-style distressed sales",
  },
  visa: {
    id: "visa",
    label: "VISA",
    short: "◎",
    blurb: "AED 750k / AED 2M thresholds, Golden Visa positioning",
  },
  luxury: {
    id: "luxury",
    label: "LUXURY",
    short: "◆",
    blurb: "Prime villas, branded residences, waterfront and trophy assets",
  },
  commercial: {
    id: "commercial",
    label: "COMM",
    short: "▦",
    blurb: "Offices, retail, warehouses, staff accommodation, cap-rate plays",
  },
  land: {
    id: "land",
    label: "LAND",
    short: "▱",
    blurb: "Plots, GFA, FAR, villa land, redevelopment optionality",
  },
  market: {
    id: "market",
    label: "MARKET",
    short: "Σ",
    blurb: "DLD transaction data, rent-index shifts, supply and demand signals",
  },
  lead: {
    id: "lead",
    label: "LEAD",
    short: "+",
    blurb: "Seller, landlord, buyer, tenant, and broker relationship leads",
  },
  duplicate: {
    id: "duplicate",
    label: "DUPE",
    short: "≡",
    blurb: "Same unit detected across portals, brokers, prices, or stale reposts",
  },
  legal: {
    id: "legal",
    label: "LEGAL",
    short: "§",
    blurb: "Oqood, title deed, service charges, RERA forms, escrow and transfer risk",
  },
  media: {
    id: "media",
    label: "MEDIA",
    short: "▷",
    blurb: "Market commentary, listing videos, broker tours, developer decks",
  },
};
