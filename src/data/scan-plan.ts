import type { Category } from "./schema";

export type ScanSourceKind =
  | "portal"
  | "official-data"
  | "developer"
  | "auction"
  | "brokerage"
  | "market-data";

export interface ScanSource {
  /** Stable id written into sweep-draft.sourcesChecked when searched. */
  id: string;
  label: string;
  kind: ScanSourceKind;
  cadence: "every-sweep" | "daily" | "weekly";
  categories: Category[];
  urls: string[];
  /** WebSearch queries the Claude/WebFetch collector should run. */
  queries: string[];
  /** Signals that turn raw pages into possible opportunity cards. */
  opportunitySignals: string[];
  /** Fields used to merge duplicate ads before creating a new card. */
  dedupeKeys: string[];
}

export const SCAN_SOURCES: ScanSource[] = [
  {
    id: "property-finder-sale-rent",
    label: "Property Finder sale/rent portal inventory",
    kind: "portal",
    cadence: "every-sweep",
    categories: ["distress", "ready", "rental", "luxury", "commercial", "duplicate", "lead"],
    urls: [
      "https://www.propertyfinder.ae/en/search?c=2&l=1&ob=mr&page=1&rp=y",
      "https://www.propertyfinder.ae/en/search?c=1&l=1&ob=mr&page=1&rp=y",
    ],
    queries: [
      "site:propertyfinder.ae/en/property-for-sale Dubai vacant urgent price reduced",
      "site:propertyfinder.ae/en/commercial-buy Dubai office vacant price reduced",
      "site:propertyfinder.ae/en/property-for-rent Dubai Marina JVC Business Bay rent furnished",
    ],
    opportunitySignals: [
      "new or materially changed ask price",
      "urgent/vacant/motivated wording",
      "same unit marketed by multiple brokers",
      "ask below recent DLD or portal comps after normalizing for building/view/size",
    ],
    dedupeKeys: ["portalUrl", "community", "building", "bedrooms", "bathrooms", "sizeSqft", "floorOrViewText", "imageSet"],
  },
  {
    id: "bayut-sale-rent",
    label: "Bayut sale/rent portal inventory",
    kind: "portal",
    cadence: "every-sweep",
    categories: ["ready", "rental", "visa", "commercial", "duplicate", "lead"],
    urls: [
      "https://www.bayut.com/for-sale/property/dubai/",
      "https://www.bayut.com/to-rent/property/dubai/",
      "https://www.bayut.com/for-sale/offices/dubai/",
    ],
    queries: [
      "site:bayut.com/for-sale Dubai JVC studio investor yield vacant",
      "site:bayut.com/for-sale Dubai Business Bay office vacant fitted",
      "site:bayut.com/to-rent Dubai Marina furnished yearly rent comparable",
    ],
    opportunitySignals: [
      "rent-backed yield spread",
      "AED 750k / AED 2M visa threshold positioning",
      "commercial fit-out, parking, or vacancy flags",
      "same-unit price spread versus Property Finder or broker pages",
    ],
    dedupeKeys: ["portalUrl", "community", "building", "unitType", "sizeSqft", "price", "descriptionFingerprint", "imageSet"],
  },
  {
    id: "dubizzle-houza-crosscheck",
    label: "Dubizzle and Houza cross-check inventory",
    kind: "portal",
    cadence: "daily",
    categories: ["duplicate", "lead", "ready", "rental"],
    urls: ["https://dubai.dubizzle.com/property-for-sale/", "https://houza.com/en/search/dubai/property-for-sale"],
    queries: [
      "site:dubai.dubizzle.com/property-for-sale Dubai urgent vacant owner",
      "site:houza.com/en/property-for-sale Dubai price reduced vacant",
    ],
    opportunitySignals: [
      "owner/direct or agency lead details",
      "listing appears outside the two major portals",
      "duplicate photos with a different broker or ask",
    ],
    dedupeKeys: ["community", "building", "sizeSqft", "bedrooms", "brokerName", "phoneOrPermit", "imageSet"],
  },
  {
    id: "dld-rera-official-data",
    label: "Dubai Land Department / RERA official data",
    kind: "official-data",
    cadence: "every-sweep",
    categories: ["market", "legal", "rental", "visa"],
    urls: [
      "https://dubailand.gov.ae/en/open-data/real-estate-data/",
      "https://dubailand.gov.ae/en/eservices/real-estate-data/#/",
      "https://dubailand.gov.ae/en/eservices/dubai-rest/",
    ],
    queries: [
      "site:dubailand.gov.ae Dubai real estate transactions apartment villa rental index",
      "Dubai Land Department transactions Dubai Marina JVC Business Bay recent sales",
      "Dubai RERA rent index property investor visa AED 750000 2 million",
    ],
    opportunitySignals: [
      "recent transaction comp differs materially from portal ask",
      "rent-index or rental comp changes underwrite a yield card",
      "title/Oqood/escrow/broker verification step needed",
    ],
    dedupeKeys: ["projectName", "community", "propertyType", "transactionDate", "sizeSqft", "price"],
  },
  {
    id: "developer-launch-inventory",
    label: "Developer launches, inventory sheets, handovers and payment plans",
    kind: "developer",
    cadence: "daily",
    categories: ["developer", "offplan", "luxury", "visa", "lead"],
    urls: ["https://www.emaar.com/", "https://www.nakheel.com/", "https://www.damacproperties.com/", "https://sobha.com/"],
    queries: [
      "Dubai developer launch payment plan handover Emaar Nakheel DAMAC Sobha",
      "Dubai off plan assignment resale payment plan handover urgent seller",
      "site:emaar.com Dubai launch payment plan handover branded residence",
    ],
    opportunitySignals: [
      "new launch or inventory sheet change",
      "post-handover payment plan or installment pressure",
      "assignment resale priced below developer stock",
      "handover cluster that affects rental supply",
    ],
    dedupeKeys: ["developer", "projectName", "unitType", "layout", "paidPercent", "handoverDate"],
  },
  {
    id: "auction-distress",
    label: "Auction, bank and court-sale distress pipeline",
    kind: "auction",
    cadence: "daily",
    categories: ["auction", "distress", "legal", "ready"],
    urls: ["https://www.emiratesauction.com/"],
    queries: [
      "site:emiratesauction.com Dubai property auction apartment villa",
      "Dubai property auction bank court sale vacant title deed",
    ],
    opportunitySignals: [
      "opening bid materially below comps",
      "auction deposit/timeline creates execution edge",
      "occupancy/title/legal risk requires specialist diligence",
    ],
    dedupeKeys: ["auctionLot", "community", "building", "propertyType", "sizeSqft", "openingBid"],
  },
  {
    id: "brokerage-luxury-leads",
    label: "Brokerage, luxury agency and seller-lead pages",
    kind: "brokerage",
    cadence: "daily",
    categories: ["luxury", "lead", "ready", "land"],
    urls: ["https://www.luxuryproperty.com/", "https://www.bhomes.com/", "https://www.allsoppandallsopp.com/"],
    queries: [
      "site:luxuryproperty.com Dubai Emirates Hills villa sale price reduced",
      "site:bhomes.com Dubai villa vacant motivated seller",
      "site:allsoppandallsopp.com Dubai property price reduced vacant",
    ],
    opportunitySignals: [
      "seller intent inferred from price/photo/broker changes",
      "prime-area scarcity or off-market buyer match",
      "land or villa redevelopment optionality",
    ],
    dedupeKeys: ["agency", "community", "subCommunity", "plotSqft", "builtUpSqft", "bedrooms", "imageSet"],
  },
  {
    id: "market-data-comps",
    label: "Market-data and comp references",
    kind: "market-data",
    cadence: "daily",
    categories: ["market", "rental", "commercial"],
    urls: ["https://dxbinteract.com/"],
    queries: [
      "Dubai real estate transaction data Dubai Marina JVC Business Bay average price per sqft",
      "Dubai rental yields JVC Marina Business Bay 2026 apartments offices",
    ],
    opportunitySignals: [
      "area-level transaction trend validates or rejects portal underpricing",
      "rent/yield spread supports a rental or short-let card",
      "supply trend changes handover or resale risk",
    ],
    dedupeKeys: ["community", "projectName", "propertyType", "period", "metric"],
  },
];

export const EVERY_SWEEP_SOURCE_IDS = SCAN_SOURCES
  .filter((source) => source.cadence === "every-sweep")
  .map((source) => source.id);
