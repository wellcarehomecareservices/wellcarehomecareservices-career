import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "personal-care",
    name: "Personal Care",
    icon: "HandHeart",
    cardBlurb:
      "Bathing, dressing, and mobility support delivered the way your loved one would ask for it themselves — patiently, and with their dignity intact.",
    heroLine:
      "The daily routines that get harder with age, handled by someone who asks first and rushes never.",
    metaDescription:
      "Licensed personal care aides serving Fort Bend County, TX — bathing, dressing, mobility, and medication support at home in Sugar Land, Richmond, Katy, and nearby cities.",
    whatsIncluded: [
      "Bathing, grooming, and dressing assistance",
      "Mobility support and fall-risk transfers (bed, chair, bathroom)",
      "Medication reminders and adherence tracking",
      "Toileting and continence care",
      "Feeding assistance for those who need it",
      "Skin checks to catch pressure sores early",
    ],
    whoItsFor: [
      "Someone who's started skipping showers because getting in and out alone feels risky",
      "A parent whose medication schedule has gotten harder to track on their own",
      "Anyone recovering mobility after a fall, surgery, or hospital stay",
      "Families who want a consistent caregiver, not a rotation of strangers, for daily hands-on help",
    ],
    firstVisit: {
      intro:
        "Before anyone touches a task list, a care coordinator sits down with your family to learn the specifics: what your loved one can still do on their own, what they've stopped trying, and what they're self-conscious about. That conversation becomes the care plan.",
      steps: [
        "A registered care coordinator visits your home to assess mobility, routines, and preferences — no caregiver is assigned yet",
        "We match a caregiver based on personality fit and any specialized needs (language, gender preference, experience with a specific condition)",
        "The caregiver shadows the coordinator on visit one so your loved one never has to re-explain their routine from scratch",
        "We check in by phone within 48 hours to adjust anything that felt off",
      ],
    },
    sampleRoutine: [
      { time: "8:00 AM", activity: "Arrival, morning greeting, medication reminder" },
      { time: "8:15 AM", activity: "Bathing and dressing assistance" },
      { time: "9:00 AM", activity: "Breakfast prep and feeding assistance if needed" },
      { time: "9:30 AM", activity: "Light mobility exercises or a short walk, if approved by their doctor" },
      { time: "10:00 AM", activity: "Skin check, grooming touch-ups, tidy the immediate living space" },
    ],
    faq: [
      {
        question: "Will my mom have the same caregiver every visit?",
        answer:
          "For recurring schedules, yes — we assign a primary caregiver and a backup for sick days or vacations, so there's never a stranger showing up unannounced. Both are introduced before they're ever alone with your mom.",
      },
      {
        question: "What if she refuses help with bathing?",
        answer:
          "It happens, especially early on. Caregivers are trained to slow down, explain each step, and offer control where they can (which arm first, water temperature) rather than pushing through resistance. We'll adjust the approach with your family if something isn't working.",
      },
      {
        question: "Can visits be as short as a couple hours a day?",
        answer:
          "Yes. Personal care visits are scheduled in blocks as short as two hours, and can run daily, a few days a week, or overnight — whatever matches the actual gap in care.",
      },
    ],
    image: {
      description:
        "Caregiver helping an older adult steady themselves while getting up from a chair, warm morning light, hands visible and gentle",
      alt: "A caregiver assisting an older adult with mobility support at home",
      aspect: "landscape",
      src: "/images/personal-care.jpg",
    },
  },
  {
    slug: "companion-care",
    name: "Companion Care",
    icon: "Users",
    cardBlurb:
      "A familiar face for meals, errands, and real conversation — for the days when the hardest part isn't a task, it's being alone.",
    heroLine:
      "Isolation shortens lives as surely as any diagnosis. Companion care is the antidote nobody prescribes.",
    metaDescription:
      "Companion care in Fort Bend County, TX — meals, conversation, transportation, and errands for seniors. Serving Sugar Land, Missouri City, Katy, and surrounding cities.",
    whatsIncluded: [
      "Conversation, games, and shared hobbies",
      "Meal planning and preparation",
      "Light housekeeping — dishes, laundry, tidying",
      "Transportation to appointments, errands, or social visits",
      "Grocery shopping and meal prep together",
      "Gentle encouragement to stay active and engaged",
    ],
    whoItsFor: [
      "A widow or widower whose social circle has shrunk since losing a spouse",
      "Someone who's still fully independent physically but shouldn't be driving anymore",
      "Adult children who live out of state and worry about long stretches of silence between calls",
      "Anyone whose world has gotten smaller than they'd like it to be",
    ],
    firstVisit: {
      intro:
        "Companion care only works if the personality match is right — we're not filling a time slot, we're finding someone your loved one will actually want to see again. The first visit is as much interview as it is care.",
      steps: [
        "We ask about hobbies, interests, and conversation style before ever proposing a caregiver",
        "A first visit is scheduled around something low-pressure — a shared meal, a card game, a walk",
        "Your loved one gives direct feedback afterward, and we'll swap caregivers if the fit isn't right, no hard feelings",
        "A recurring schedule is set once everyone's comfortable",
      ],
    },
    faq: [
      {
        question: "Is this really just 'babysitting' for adults?",
        answer:
          "No — and we hear this concern often. Companion caregivers are trained to notice changes in mood, appetite, and cognition that families and doctors miss between visits, on top of providing genuine company. It's care that happens to look like friendship.",
      },
      {
        question: "Can the caregiver drive my dad to his doctor's appointments?",
        answer:
          "Yes, transportation to appointments, errands, and social events is a standard part of companion care, using either the caregiver's insured vehicle or your dad's, depending on preference.",
      },
    ],
    image: {
      description:
        "Caregiver and older adult laughing together over a card game at a kitchen table, natural light, genuine expressions",
      alt: "A caregiver sharing a card game and conversation with an older adult",
      aspect: "landscape",
      src: "/images/companion-care.jpg",
    },
  },
  {
    slug: "respite-care",
    name: "Respite Care",
    icon: "RefreshCw",
    cardBlurb:
      "Planned relief for the family member who's been carrying this alone — a weekend, a week, or a few hours every Tuesday.",
    heroLine:
      "You can't pour from an empty cup, and burnout doesn't make you a better caregiver. It makes you a tired one.",
    metaDescription:
      "Respite care for family caregivers in Fort Bend County, TX — flexible hourly, overnight, and multi-day relief coverage across Sugar Land, Richmond, and nearby cities.",
    whatsIncluded: [
      "Short-notice or scheduled coverage, from a few hours to several days",
      "Full handoff of your loved one's existing routine and medication schedule",
      "Overnight and weekend availability",
      "The same personal or companion care your family member already receives",
      "A written summary of the visit so you're not left guessing what happened while you were away",
    ],
    whoItsFor: [
      "A spouse who hasn't had an uninterrupted night's sleep in months",
      "An adult child juggling caregiving with a job and their own kids",
      "Families who need coverage for a wedding, a work trip, or just a weekend to breathe",
      "Anyone who's started resenting the role, which is a sign relief is overdue, not a failure",
    ],
    firstVisit: {
      intro:
        "Respite care has to work from hour one — there's no ramp-up period when you're catching a flight in the morning. The first visit focuses entirely on transferring what you already know.",
      steps: [
        "We schedule a handoff call or visit before the respite window begins, where you walk us through the daily routine, medications, and anything that tends to go sideways",
        "A caregiver already experienced with your loved one's specific needs is matched whenever possible",
        "You get a direct line to your caregiver and a coordinator for the full duration, not just an after-the-fact report",
        "A short written summary is left for you at the end of the coverage window",
      ],
    },
    faq: [
      {
        question: "How much notice do you need for respite coverage?",
        answer:
          "For a planned trip, two weeks lets us match the best-fit caregiver. For emergencies, we keep an on-call roster and can often place someone within 24 hours — call and we'll tell you honestly what's possible.",
      },
      {
        question: "Can respite care cover overnight or multi-day stretches?",
        answer:
          "Yes. Overnight, 24-hour, and multi-day respite blocks are common, and pricing is structured differently for extended coverage — ask your care coordinator for the breakdown.",
      },
    ],
    image: {
      description:
        "Adult daughter handing off a notebook of care notes to a caregiver at the front door, both smiling, suitcase visible in background",
      alt: "A family caregiver handing off care notes to a respite caregiver",
      aspect: "landscape",
      src: "/images/respite-care.jpg",
    },
  },
  {
    slug: "in-facility-care",
    name: "In-Facility Care",
    icon: "Building2",
    cardBlurb:
      "One-on-one attention inside assisted living or skilled nursing, for the moments the facility staff can't slow down for.",
    heroLine:
      "Good facilities do a lot. They can't do individual, unhurried attention for every resident, every day. We can.",
    metaDescription:
      "One-on-one in-facility caregiver support inside Fort Bend County assisted living and skilled nursing communities — supplemental attention beyond staffing ratios.",
    whatsIncluded: [
      "One-on-one companionship and supervision beyond facility staffing ratios",
      "Coordination with facility nursing and care staff",
      "Meal-time assistance and encouragement to eat",
      "Advocacy during care-plan meetings and physician visits",
      "Extra mobility and activity support between facility programming",
    ],
    whoItsFor: [
      "A parent in assisted living who's become withdrawn since the move",
      "Someone in skilled nursing recovering from surgery who needs more attention than staffing ratios allow",
      "Families who live too far to visit daily but want a consistent set of eyes on their loved one's care",
      "Residents at risk of falls or wandering who need supervision facility staff can't provide continuously",
    ],
    firstVisit: {
      intro:
        "In-facility care requires coordination on two fronts — your family and the facility's care team. We handle both so nothing falls through the cracks between them.",
      steps: [
        "We contact the facility directly to confirm visiting hours, care-plan access, and any requirements for outside caregivers",
        "A coordinator meets your loved one on-site to understand what the facility already covers and where the gaps are",
        "A caregiver is introduced to both your family and the facility's nursing staff, so care stays coordinated rather than duplicated",
        "We send you a summary after each visit, since you're likely not there to see it firsthand",
      ],
    },
    faq: [
      {
        question: "Do facilities allow outside caregivers?",
        answer:
          "Most assisted living and skilled nursing facilities in our service area do, and we coordinate directly with facility administration to confirm requirements before the first visit — you don't have to navigate that alone.",
      },
      {
        question: "Will the caregiver conflict with the facility's own staff?",
        answer:
          "No — our caregivers are trained to work alongside facility staff, not around them. We communicate directly with nursing staff about care plans so everyone stays on the same page.",
      },
    ],
    image: {
      description:
        "Caregiver sitting beside a resident in a bright assisted-living common room, warm interaction, facility setting visible but not sterile",
      alt: "A caregiver providing one-on-one support to a resident inside an assisted living facility",
      aspect: "landscape",
      src: "/images/in-facility-care.jpg",
    },
  },
  {
    slug: "specialized-care",
    name: "Specialized Care",
    icon: "Brain",
    cardBlurb:
      "Caregivers trained specifically for Alzheimer's, Parkinson's, dementia, and post-surgical recovery — not general help stretched thin.",
    heroLine:
      "A condition like dementia doesn't respond to good intentions alone. It responds to training.",
    metaDescription:
      "Specialized caregivers trained in Alzheimer's, dementia, Parkinson's, and post-surgical recovery care across Fort Bend County, TX — Sugar Land, Richmond, and Katy.",
    whatsIncluded: [
      "Caregivers trained in dementia and Alzheimer's-specific communication techniques",
      "Parkinson's-aware mobility support and fall prevention",
      "Post-surgical recovery assistance, coordinated with discharge instructions",
      "Behavioral redirection techniques for confusion, agitation, or sundowning",
      "Regular updates to family on cognitive or physical changes worth flagging to a physician",
    ],
    whoItsFor: [
      "A spouse newly diagnosed with early-stage Alzheimer's who still wants independence but needs a safety net",
      "Someone with Parkinson's whose balance and coordination have declined enough that living alone feels unsafe",
      "A patient just discharged from surgery who needs help following recovery instructions correctly",
      "Families exhausted by the specific unpredictability of a progressive condition, not just general aging",
    ],
    firstVisit: {
      intro:
        "Specialized care starts with matching, not scheduling. We only place caregivers who've been specifically trained for your loved one's condition — general caregiving experience isn't treated as a substitute.",
      steps: [
        "A coordinator reviews the diagnosis, current stage, and any physician or discharge instructions with your family",
        "We match a caregiver with direct experience in that specific condition, not just general senior care",
        "The first visit is shorter and closely observed, so the caregiver can calibrate to your loved one's specific triggers, routines, and communication style",
        "We stay in contact with your loved one's physician or care team when there's something worth flagging",
      ],
    },
    faq: [
      {
        question: "Are your caregivers actually trained in dementia care, or is that just marketing language?",
        answer:
          "Every caregiver placed on a dementia or Alzheimer's case has completed condition-specific training beyond our baseline certification, covering communication techniques, redirection strategies, and safety protocols for wandering and agitation. We can share training records on request.",
      },
      {
        question: "Can specialized care follow someone home after surgery for a limited time only?",
        answer:
          "Yes — post-surgical recovery care is often short-term by design, scaling down as your loved one regains independence. We build the plan around their discharge instructions and adjust as recovery progresses.",
      },
    ],
    image: {
      description:
        "Caregiver gently guiding an older adult through a balance exercise in a living room, focused and patient expression",
      alt: "A specially trained caregiver assisting a client with Parkinson's-aware mobility support",
      aspect: "landscape",
      src: "/images/specialized-care.jpg",
    },
  },
  {
    slug: "end-of-life-care",
    name: "End-of-Life Care",
    icon: "HeartHandshake",
    cardBlurb:
      "Comfort-focused, non-medical support that works alongside hospice — so your family can be present instead of exhausted.",
    heroLine:
      "In the time that's left, the goal isn't more tasks done well. It's more time spent as family, not caregivers.",
    metaDescription:
      "Comfort-focused end-of-life home care in Fort Bend County, TX that works alongside hospice — non-medical support so your family can be present, not exhausted.",
    whatsIncluded: [
      "Comfort-focused personal care coordinated with hospice or palliative teams",
      "Overnight and around-the-clock coverage options",
      "Emotional support and presence for both the patient and family members",
      "Light housekeeping and meal support so family can focus on being present",
      "Coordination with hospice nurses on pain management routines and positioning",
    ],
    whoItsFor: [
      "A family already working with hospice who needs additional hands-on support between nurse visits",
      "Someone choosing to spend their final months at home rather than in a facility",
      "Family members who want to be present as relatives, not exhausted from providing round-the-clock physical care",
      "Households needing overnight coverage so someone is always awake and attentive",
    ],
    firstVisit: {
      intro:
        "This is the most sensitive care we provide, and the first visit reflects that — it's unhurried, coordinated closely with any existing hospice team, and led by your family's pace, not ours.",
      steps: [
        "A coordinator meets with your family and, where possible, your hospice team to understand the current care plan and pain management routine",
        "We match a caregiver experienced in end-of-life support, chosen as much for temperament as skill",
        "The first visit centers on observing hospice protocols already in place, so nothing is duplicated or contradicted",
        "We stay flexible on hours as needs change, often day to day, without requiring a new contract each time",
      ],
    },
    faq: [
      {
        question: "Do you work alongside hospice, or instead of it?",
        answer:
          "Alongside. Hospice provides medical oversight and periodic nursing visits; we provide the non-medical, hands-on presence in between those visits — the two are meant to work together, and we coordinate directly with hospice staff to keep care consistent.",
      },
      {
        question: "Can care hours change quickly as needs change?",
        answer:
          "Yes, and we expect them to. End-of-life care schedules are built to flex day to day, including quick increases to overnight or continuous coverage, without a lengthy re-authorization process.",
      },
    ],
    image: {
      description:
        "Adult child's hand resting on an elderly parent's hand on a quilted blanket, soft window light, quiet and tender",
      alt: "A family member's hand resting gently on their elderly parent's hand",
      aspect: "landscape",
      src: "/images/end-of-life.jpg",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
