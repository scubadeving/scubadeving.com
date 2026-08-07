export type ProductStatus = "in-development" | "coming-soon" | "available";

export interface Feature {
  title: string;
  description: string;
}

export interface ProductCta {
  heading: string;
  body: string;
  emailSubject: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  /** Short copy for the homepage card */
  cardDescription: string;
  /** Full copy for the product page hero */
  heroDescription: string;
  status: ProductStatus;
  platform: string;
  /** Primary brand color — used for feature borders, og:image accent line */
  brandColor: string;
  /** Path to the 512×512 app icon PNG under /public — renders on cards and product pages */
  appIcon?: string;
  features: Feature[];
  cta: ProductCta;
  /** Optional notice box (e.g. life-support disclaimer) */
  notice?: string;
}

export const statusLabel: Record<ProductStatus, string> = {
  "in-development": "In development",
  "coming-soon": "Coming soon",
  available: "Available",
};

export const statusColor: Record<ProductStatus, string> = {
  "in-development": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "coming-soon": "text-ink-muted bg-surface-border/50 border-surface-border",
  available: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

export const products: Product[] = [
  {
    id: "looplogic",
    name: "LoopLogic",
    tagline: "CCR operations & analytics",
    cardDescription:
      "Purpose-built for closed-circuit rebreather divers. Pre-dive checklists, O₂ cell linearity testing, cell health analytics, and scrubber tracking — actively in development.",
    heroDescription:
      "A comprehensive companion for closed-circuit rebreather divers. Covers pre-dive checklists, O₂ cell linearity testing, cell health analytics, and scrubber tracking — all offline-first, all in one place. Actively in development — approaching early testing.",
    status: "in-development",
    platform: "Android — iOS & more coming soon",
    brandColor: "#00BFA5",
    appIcon: "/icons/looplogic.png",
    features: [
      {
        title: "Smart checklists",
        description:
          "Unit-specific pre-dive checklists for Sidewinder, JJ-CCR, rEvo, AP, and more. Mandatory verification steps with timestamp logging — no step can be skipped.",
      },
      {
        title: "Cell health analytics",
        description:
          "Track O₂ cell voltage, linearity, and age over time. Visualize millivolt drift to predict cell failure before it becomes a problem underwater.",
      },
      {
        title: "Scrubber tracking",
        description:
          "Monitor absorbent usage and time remaining based on manufacturer-specific duration charts. Know your scrubber state before every dive.",
      },
      {
        title: "Offline-first",
        description:
          "All records stay on-device. No account, no cloud dependency — works on the dive deck with no signal.",
      },
    ],
    cta: {
      heading: "Interested in beta testing?",
      body: "LoopLogic is approaching early testing. If you're a CCR diver who wants to try it before public release, get in touch.",
      emailSubject: "LoopLogic beta interest",
      label: "Express interest",
    },
    notice:
      "LoopLogic is a supplemental tool for dive planning and equipment tracking. It is not a dive computer and should never be used as a primary life-support instrument. Always cross-verify with manufacturer-approved tables or computers.",
  },
  {
    id: "hydrovault",
    name: "HydroVault",
    tagline: "Scuba cylinder management",
    cardDescription:
      "Track hydrostatic tests, VIP inspections, and O₂ service records for your scuba cylinders. Early development.",
    heroDescription:
      "Android app for tracking scuba cylinder maintenance — hydrostatic tests, visual inspections, and O₂ service records with automatic expiry alerts. Early development.",
    status: "in-development",
    platform: "Android — iOS & more coming soon",
    brandColor: "#00B0FF",
    appIcon: "/icons/hydrovault.png",
    features: [
      {
        title: "Cylinder records",
        description:
          "Maintain a complete inventory of every cylinder you own — material, fill pressure, manufacture date, and serial number.",
      },
      {
        title: "Service history",
        description:
          "Full log of hydrostatic tests, VIP inspections, and O₂ clean service events — every entry timestamped and stored offline.",
      },
      {
        title: "Expiry alerts",
        description:
          "Automatic reminders before hydro or VIP certificates expire, based on DOT and EN inspection intervals.",
      },
      {
        title: "Regulatory specs built in",
        description:
          "Supports both NA (DOT) and European (EN 1975 / EN 1964) standards. Inspection intervals derived from spec, not manual input.",
      },
    ],
    cta: {
      heading: "Stay in the loop",
      body: "HydroVault is in early development. If you manage your own scuba gear and want to follow along or share what you'd want from this kind of tool, get in touch.",
      emailSubject: "HydroVault interest",
      label: "Get in touch",
    },
  },
];
