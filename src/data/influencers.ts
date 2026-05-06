export type Platform =
  | "portal"
  | "government"
  | "developer"
  | "brokerage"
  | "auction"
  | "data"
  | "media";

export interface Influencer {
  id: string;
  name: string;
  realName?: string;
  handle: string;
  bio: string;
  image: string;
  platform: Platform;
  url: string;
  followers: string;
  followersRaw: number;
  links?: { platform: Platform; url: string; label?: string }[];
  tags: string[];
}

export const PLATFORM_META: Record<
  Platform,
  { label: string; icon: string; metric: string }
> = {
  portal: { label: "Portal", icon: "⌂", metric: "listings" },
  government: { label: "Gov/Data", icon: "§", metric: "datasets" },
  developer: { label: "Developer", icon: "◇", metric: "launches" },
  brokerage: { label: "Brokerage", icon: "◎", metric: "mandates" },
  auction: { label: "Auction", icon: "⚖", metric: "lots" },
  data: { label: "Data", icon: "Σ", metric: "signals" },
  media: { label: "Media", icon: "▷", metric: "updates" },
};

// Source map for the Dubai real-estate intelligence workflow. Counts are
// deliberately coarse: they rank source utility/coverage, not social status.
export const influencers: Influencer[] = [
  {
    id: "property-finder",
    name: "Property Finder",
    handle: "propertyfinder",
    bio: "Primary Dubai listing portal for apartments, villas, commercial stock, broker inventory, price changes, stale ads, and duplicate-unit matching.",
    image: "",
    platform: "portal",
    url: "https://www.propertyfinder.ae/",
    followers: "High",
    followersRaw: 1000000,
    tags: ["listings", "broker-ads", "duplicates", "price-changes"],
  },
  {
    id: "bayut",
    name: "Bayut",
    handle: "bayut",
    bio: "Dubai portal used for parallel inventory checks, rent comps, building-level supply, agent cross-checks, and same-unit price dispersion.",
    image: "",
    platform: "portal",
    url: "https://www.bayut.com/",
    followers: "High",
    followersRaw: 950000,
    tags: ["listings", "rent-comps", "availability", "brokerage"],
  },
  {
    id: "dubai-land-department",
    name: "Dubai Land Department",
    handle: "dubailand",
    bio: "Official transaction, ownership, valuation, rent-index, and regulatory source used to verify pricing, transfers, fees, and market context.",
    image: "",
    platform: "government",
    url: "https://dubailand.gov.ae/",
    followers: "Official",
    followersRaw: 900000,
    tags: ["dld", "transactions", "title", "rent-index", "regulation"],
  },
  {
    id: "rera",
    name: "RERA / Dubai REST",
    handle: "dubairest",
    bio: "Regulatory and app-based source for broker, project, escrow, title, and rental-index checks before a lead becomes actionable.",
    image: "",
    platform: "government",
    url: "https://dubailand.gov.ae/en/eservices/dubai-rest/",
    followers: "Official",
    followersRaw: 850000,
    tags: ["rera", "escrow", "broker-check", "legal"],
  },
  {
    id: "emaar",
    name: "Emaar",
    handle: "emaar",
    bio: "Developer source for Downtown, Creek Harbour, Dubai Hills, branded launches, inventory sheets, payment plans, and handover timelines.",
    image: "",
    platform: "developer",
    url: "https://www.emaar.com/",
    followers: "Prime",
    followersRaw: 800000,
    tags: ["developer", "downtown", "dubai-hills", "launches"],
  },
  {
    id: "nakheel",
    name: "Nakheel",
    handle: "nakheel",
    bio: "Developer source for Palm, Jumeirah Islands, waterfront villas, community notices, handovers, and premium land/villa supply signals.",
    image: "",
    platform: "developer",
    url: "https://www.nakheel.com/",
    followers: "Prime",
    followersRaw: 780000,
    tags: ["developer", "palm", "waterfront", "villas"],
  },
  {
    id: "emirates-auction",
    name: "Emirates Auction",
    handle: "emiratesauction",
    bio: "Auction source for court, bank, and distressed lots where opening bids, deposits, timelines, title details, and occupancy risk must be tracked.",
    image: "",
    platform: "auction",
    url: "https://www.emiratesauction.com/",
    followers: "Niche",
    followersRaw: 600000,
    tags: ["auction", "distress", "bank", "court"],
  },
  {
    id: "dxboffplan",
    name: "DXBinteract / Market Data",
    handle: "dxbdata",
    bio: "Comparable-sales and market-data reference used to sanity-check portal asks against recent DLD transactions and community trend lines.",
    image: "",
    platform: "data",
    url: "https://dxbinteract.com/",
    followers: "Data",
    followersRaw: 550000,
    tags: ["comps", "transactions", "market", "pricing"],
  }
];
