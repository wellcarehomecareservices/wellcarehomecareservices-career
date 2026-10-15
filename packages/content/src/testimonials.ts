import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "t-sugarland-dementia",
    quote:
      "My father stopped recognizing me most afternoons before we found WellCare. His caregiver learned to redirect his confusion instead of correcting it, and our visits together got easier almost immediately. That's a skill, not a personality trait — I wish I'd known that sooner.",
    name: "Renata Osei",
    location: "Sugar Land, TX",
    relationship: "Daughter of a client",
    serviceSlug: "specialized-care",
    avatar: {
      description: "Portrait of a woman in her 50s, warm smile, neutral background",
      alt: "Portrait of Renata Osei",
      aspect: "square",
    },
  },
  {
    id: "t-richmond-parkinsons",
    quote:
      "The caregiver they matched with my husband actually understood Parkinson's gait — how to spot when he was about to freeze up, how to steady him without making him feel handled. That specific knowledge is the whole reason we haven't had a fall in eight months.",
    name: "Carol Whitfield",
    location: "Richmond, TX",
    relationship: "Spouse of a client",
    serviceSlug: "specialized-care",
    avatar: {
      description: "Portrait of a woman in her 60s, glasses, soft natural lighting",
      alt: "Portrait of Carol Whitfield",
      aspect: "square",
    },
  },
  {
    id: "t-missouricity-poststroke",
    quote:
      "After my mother's stroke, the hospital handed us a discharge packet and wished us luck. WellCare's caregiver actually read it, followed the physical therapy instructions correctly, and told us honestly when something looked off. She's walking with a cane now instead of a walker.",
    name: "Julian Marsh",
    location: "Missouri City, TX",
    relationship: "Son of a client",
    serviceSlug: "specialized-care",
    avatar: {
      description: "Portrait of a man in his 40s, casual, outdoor setting",
      alt: "Portrait of Julian Marsh",
      aspect: "square",
    },
  },
  {
    id: "t-katy-respite",
    quote:
      "I hadn't left my wife alone with anyone in three years. The first respite weekend, I called twice out of guilt and both times everything was fine — better than fine. I came back rested for the first time since her diagnosis.",
    name: "Tom Alvarez",
    location: "Katy, TX",
    relationship: "Spouse of a client",
    serviceSlug: "respite-care",
    avatar: {
      description: "Portrait of a man in his 60s, warm expression, home setting",
      alt: "Portrait of Tom Alvarez",
      aspect: "square",
    },
  },
  {
    id: "t-rosenberg-companion",
    quote:
      "My mom went from dreading every day since Dad passed to actually asking when her caregiver is coming back. It wasn't a medical need we hired for — it was loneliness, and it turns out that's just as real to treat.",
    name: "Danielle Prescott",
    location: "Rosenberg, TX",
    relationship: "Daughter of a client",
    serviceSlug: "companion-care",
    avatar: {
      description: "Portrait of a woman in her 40s, friendly smile, indoor lighting",
      alt: "Portrait of Danielle Prescott",
      aspect: "square",
    },
  },
  {
    id: "t-cincoranch-personal",
    quote:
      "My father is a proud man and hated the idea of needing help bathing. His caregiver figured out how to let him keep control of the parts he could still do himself, and that changed everything about how he talks about the visits now.",
    name: "Marcus Ibe",
    location: "Cinco Ranch, TX",
    relationship: "Son of a client",
    serviceSlug: "personal-care",
    avatar: {
      description: "Portrait of a man in his 50s, thoughtful expression, neutral background",
      alt: "Portrait of Marcus Ibe",
      aspect: "square",
    },
  },
];
