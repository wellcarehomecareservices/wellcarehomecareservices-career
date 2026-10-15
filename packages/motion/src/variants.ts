import type { Variants } from "framer-motion";

/**
 * Pure timing/easing data, kept separate from web-only components so
 * apps/mobile can reuse the numbers even where it can't reuse the JSX.
 */
export const motionTiming = {
  reveal: { durationSec: 0.6, riseOffsetPx: 14, easing: [0.16, 1, 0.3, 1] as const },
  slideIn: { durationSec: 0.55, offsetPx: 36, easing: [0.16, 1, 0.3, 1] as const },
  stagger: { childDelaySec: 0.07 },
  pulse: { cycleSec: 3.8, easing: "easeInOut" as const },
  hoverLift: { offsetPx: 4, durationSec: 0.25 },
} as const;

/** Fade + rise on scroll-into-view. No overshoot/bounce easing — calm, not playful. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: motionTiming.reveal.riseOffsetPx },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTiming.reveal.durationSec,
      ease: motionTiming.reveal.easing,
    },
  },
};

/** Slide in from the left on scroll-into-view — same calm easing as fadeRise, just horizontal. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -motionTiming.slideIn.offsetPx },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionTiming.slideIn.durationSec, ease: motionTiming.slideIn.easing },
  },
};

/** Slide in from the right on scroll-into-view. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: motionTiming.slideIn.offsetPx },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionTiming.slideIn.durationSec, ease: motionTiming.slideIn.easing },
  },
};

/** Reduced-motion fallback: a plain fade, no vertical movement, no stagger. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTiming.stagger.childDelaySec,
    },
  },
};

/** Soft teal-bloom shadow lift, used on cards and interactive tiles. */
export const cardHover = {
  rest: { y: 0, boxShadow: "0 0px 0px 0 rgb(34 120 122 / 0)" },
  hover: {
    y: -motionTiming.hoverLift.offsetPx,
    boxShadow: "0 16px 40px -12px rgb(34 120 122 / 0.10)",
    transition: { duration: motionTiming.hoverLift.durationSec, ease: "easeOut" },
  },
};

/** The "presence pulse" signature — a slow breathing glow. */
export const presencePulse: Variants = {
  animate: {
    opacity: [0.55, 0.9, 0.55],
    scale: [1, 1.06, 1],
    transition: {
      duration: motionTiming.pulse.cycleSec,
      ease: motionTiming.pulse.easing,
      repeat: Infinity,
    },
  },
};
