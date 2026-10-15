import type { TrustBadge, ValueCard } from "./types";

/**
 * Hours are still a structural placeholder — confirm and replace before
 * launch. Phone, email, and office address are real.
 */
export const businessDetails = {
  name: "WellCare",
  phone: "+1 (346) 840-9449",
  phoneHref: "+13468409449",
  email: "wellcarehomecareservices@gmail.com",
  address: {
    line1: "1546 Merulana Lane",
    line2: "",
    city: "Richmond",
    state: "TX",
    postalCode: "77406",
    country: "United States",
  },
  serviceArea: "Fort Bend County, TX",
  cities: ["Sugar Land", "Richmond", "Rosenberg", "Missouri City", "Katy", "Cinco Ranch"],
  hours: {
    officeLine1: "Mon–Fri  8:00–18:00",
    officeLine2: "Sat  9:00–13:00",
    careAvailability: "Care available 24/7 · 365 days",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61593430592244",
    instagram: "https://www.instagram.com/wellcarehomecareservices",
  },
};

/** Joins address line 1/2 for display, skipping line2 when it's blank. */
export function formatStreetAddress(): string {
  const { line1, line2 } = businessDetails.address;
  return line2 ? `${line1}, ${line2}` : line1;
}

export const hero = {
  eyebrow: "Fort Bend County's Family-Trusted Caregivers",
  headline: "Care that feels like family — because it is, once we're in your home.",
  subhead:
    "Licensed, background-checked caregivers who show up on time, listen first, and treat your parent, spouse, or grandparent like their own.",
  primaryCta: { label: "Book a Free Care Assessment", href: "/schedule-care" },
  secondaryCta: { label: "Talk to Our Team", href: "/contact" },
  image: {
    description:
      "Caregiver and older adult sitting together on a porch, mid-conversation, warm natural light, relaxed body language",
    alt: "A caregiver spending time with an older adult on a sunlit porch",
    aspect: "portrait" as const,
    src: "/images/caregiver.jpg",
  },
};

export const about = {
  headline: "We started WellCare because \"checking a box\" isn't care.",
  paragraphs: [
    "WellCare started after one of our founders spent eighteen months coordinating care for her own father — three different agencies, a new caregiver almost every week, and visit notes that read like time cards instead of updates about a person. The care wasn't bad, exactly. It just wasn't anyone's.",
    "We built WellCare around the parts that agency were skipping: a consistent caregiver instead of a rotating roster, a care plan written with the family instead of handed to them, and a coordinator who actually picks up the phone. None of that is complicated. It's just slower to scale, which is why a lot of agencies don't bother.",
    "Today we serve families across Fort Bend County with the same standard — licensed, background-checked, and matched by personality as much as by skill. If it wouldn't have been good enough for our founder's father, it isn't good enough to send to yours.",
  ],
  image: {
    description:
      "Founder-style portrait of a woman standing in a home hallway, arms crossed loosely, warm confident expression, documentary style not corporate headshot",
    alt: "Portrait of a WellCare co-founder",
    aspect: "portrait" as const,
    src: "/images/founder-style.jpg",
  },
};

export const trustBadges: TrustBadge[] = [
  { label: "Licensed & Insured", detail: "State-licensed home care agency, fully bonded and insured" },
  { label: "Background-Checked", detail: "Every caregiver clears a state and federal background check before placement" },
  { label: "Care Plans Built With Your Family", detail: "No generic templates — the plan reflects what your family actually told us" },
  { label: "A Real Person Answers the Phone", detail: "Care coordinators, not a call center, during business hours" },
];

export const valueCards: ValueCard[] = [
  {
    label: "Consistency Over Convenience",
    description: "We'd rather delay a match by a day than send whoever's available next.",
    icon: "Repeat",
  },
  {
    label: "Families Are Part of the Plan",
    description: "Care plans are written with you in the room, not delivered as a finished document.",
    icon: "Users",
  },
  {
    label: "Dignity Is Not Optional",
    description: "Every task, from bathing to conversation, is built around your loved one keeping control.",
    icon: "ShieldCheck",
  },
  {
    label: "We Say What We Don't Know",
    description: "If a need is outside our scope, we'll tell you and help you find who can actually help.",
    icon: "MessageCircle",
  },
];

export const whyChooseUs = [
  {
    label: "Same caregiver for recurring visits whenever possible",
    description: "No rotating strangers — your family gets a primary caregiver and a known backup, both introduced in advance.",
    icon: "UserCheck",
  },
  {
    label: "A coordinator responds within one business day",
    description: "Questions and schedule changes go to a person who already knows your family's care plan.",
    icon: "Clock",
  },
  {
    label: "Every caregiver completes condition-specific training before placement",
    description: "Dementia, Parkinson's, and post-surgical cases are matched to caregivers trained for that specific need, not general staff stretched thin.",
    icon: "GraduationCap",
  },
  {
    label: "Care plans are reviewed and adjusted every 90 days",
    description: "Needs change — we revisit the plan on a schedule instead of waiting for a crisis to prompt an update.",
    icon: "CalendarClock",
  },
];

export const referralSteps = [
  {
    step: 1,
    title: "Tell us who you're referring",
    description: "Submit their name and contact info through the form below — we'll reach out within one business day.",
  },
  {
    step: 2,
    title: "We handle the first conversation",
    description: "A care coordinator calls to introduce WellCare and schedule a free assessment, at no pressure to commit.",
  },
  {
    step: 3,
    title: "Your reward is confirmed once care begins",
    description: "When the family you referred starts a recurring care plan, we send your referral reward — no fine print.",
  },
];
