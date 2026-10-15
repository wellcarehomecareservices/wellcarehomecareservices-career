export interface ImagePlaceholder {
  /** Rendered as an HTML comment marker in the page so it's easy to grep for before launch. */
  description: string;
  alt: string;
  aspect: "square" | "portrait" | "landscape" | "wide";
  /** Path under /public to the real photo, once shot/licensed. Renders the dashed placeholder box when absent. */
  src?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  cardBlurb: string;
  heroLine: string;
  /** Keyword-targeted, location-aware copy for <meta name="description"> — deliberately distinct from cardBlurb so on-page and meta copy don't duplicate. */
  metaDescription: string;
  whatsIncluded: string[];
  whoItsFor: string[];
  firstVisit: {
    intro: string;
    steps: string[];
  };
  sampleRoutine?: { time: string; activity: string }[];
  faq: FaqItem[];
  image: ImagePlaceholder;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  relationship: string;
  serviceSlug: string;
  avatar: ImagePlaceholder;
}

export type BlogCategory =
  | "Safety"
  | "Health & Wellness"
  | "Nutrition"
  | "Companion Care"
  | "Care Tips";

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  teaser: string;
  publishedAt: string;
  readMinutes: number;
  image: ImagePlaceholder;
}

export interface JobListing {
  slug: string;
  title: string;
  type: "Full-time" | "Part-time" | "PRN / As Needed";
  city: string;
  summary: string;
}

export interface TrustBadge {
  label: string;
  detail: string;
}

export interface ValueCard {
  label: string;
  description: string;
  icon: string;
}
