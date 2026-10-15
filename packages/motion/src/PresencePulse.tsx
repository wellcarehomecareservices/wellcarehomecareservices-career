"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { presencePulse } from "./variants";

interface PresencePulseProps {
  /** Tailwind size classes, e.g. "h-64 w-64". Caller controls footprint since usage varies (hero vs. badge). */
  className?: string;
  /** CSS color used for the radial glow. Defaults to the brand teal. */
  color?: string;
  style?: CSSProperties;
}

/**
 * The site's one signature motion idea: a slow breathing radial glow,
 * echoing steady caregiver attentiveness. Reused behind the hero portrait,
 * the header phone number, and the "Available 24/7" badge.
 *
 * Falls back to a static glow (no animation) when the user prefers reduced motion.
 */
export function PresencePulse({ className, color = "#22787A", style }: PresencePulseProps) {
  const prefersReducedMotion = useReducedMotion();

  const glow: CSSProperties = {
    background: `radial-gradient(circle, ${color}55 0%, ${color}00 70%)`,
    ...style,
  };

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full opacity-70 ${className ?? ""}`}
        style={glow}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={glow}
      variants={presencePulse}
      animate="animate"
    />
  );
}
