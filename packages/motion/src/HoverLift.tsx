"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cardHover } from "./variants";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

/** Cards lift 4px with a soft teal shadow bloom on hover — never a hard drop-shadow. */
export function HoverLift({ children, className }: HoverLiftProps) {
  return (
    <motion.div className={className} initial="rest" whileHover="hover" animate="rest" variants={cardHover}>
      {children}
    </motion.div>
  );
}
