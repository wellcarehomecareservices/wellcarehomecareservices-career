"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeOnly, fadeRise, slideInLeft, slideInRight, staggerContainer } from "./variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, useful for hand-tuned offsets outside a StaggerGroup. */
  delay?: number;
}

/** Fades + rises content into view once, respecting prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? fadeOnly : fadeRise;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: ReactNode;
  className?: string;
  /** Which edge the content enters from. */
  from?: "left" | "right";
  delay?: number;
}

/** Slides content in from the left or right edge on scroll-into-view, respecting prefers-reduced-motion. */
export function SlideIn({ children, className, from = "left", delay = 0 }: SlideInProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? fadeOnly : from === "left" ? slideInLeft : slideInRight;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

/** Wrap a list of Reveal-style children to stagger them 60-80ms apart on enter. */
export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={prefersReducedMotion ? undefined : staggerContainer}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? fadeOnly : fadeRise;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
